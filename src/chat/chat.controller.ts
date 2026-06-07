import { Request, Response } from 'express';
import { ChatModel } from './chat.model';
import { ChatView } from './views/chat';
import { ChatItemView } from './views/chat-item';
import { ChatItemStreamView } from "./views/chat-item-stream";
import { chatRepository } from './chat.repository';
import { TitleEdit } from './views/titleEdit';
import { ChatTitleDisplay } from './views/chat-title';
import { idAsString } from '../utils/id-as-string';
import { userController } from '../user/user.controller';
import { ChatList } from './views/chat-list';
import { ChatListPage } from './views/chat-list-page';
import { ChatSearchForm } from './views/chatSearchForm';
import { ChatCount } from './views/chatCount';

export class ChatController {
    private getUserId(req: Request, res: Response): string {
        const user = userController.getUserFromSession(req, res);
        return idAsString(user._id);
    }

    public async chat(req: Request, res: Response): Promise<void> {
        const userId = this.getUserId(req, res);
        const user = req.session.user;

        let chatInstance: ChatModel;
        const lastChat = await chatRepository.findLastByUser(userId);

        if (lastChat && lastChat._id) {
            chatInstance = await ChatModel.create(userId, idAsString(lastChat._id));
        } else {
            chatInstance = await ChatModel.create(userId);
        }

        const messages = await chatInstance.messages();

        const page = ChatView({
            conversationId: chatInstance.chatId,
            messages,
            user,
        });

        res.send(page);
    }

    public async sendPrompt(req: Request, res: Response): Promise<void> {
        const userId = this.getUserId(req, res);
        const prompt = req.body.prompt;
        const streamingMode = req.body.streamingMode === 'true' || req.body.streamingMode === 'on';
        let conversationId = req.params.id as string;

        if (!prompt || prompt.trim().length === 0) {
            res.status(400).send('Le prompt ne peut pas être vide');
            return;
        }

        const chatExists = await chatRepository.exists(conversationId);
        if (!chatExists) {
            conversationId = await chatRepository.create(userId);
        }

        const chatInstance = await ChatModel.create(userId, conversationId);
        await chatInstance.addPrompt(prompt);

        const chatItemHtml = streamingMode
            ? ChatItemStreamView({ prompt, id: conversationId })
            : ChatItemView({ prompt, id: conversationId });

        res.send(chatItemHtml);
    }

    public async query(req: Request, res: Response): Promise<void> {
        try {
            const userId = this.getUserId(req, res);
            const conversationId = req.params.id as string;
            const chatInstance = await ChatModel.create(userId, conversationId);

            const notifications: string[] = [];
            const toolNotifier = (toolName: string) => {
                const notification = `\`\`\`[Outil appelé] ${toolName}\`\`\``;
                notifications.push(notification);
            };

            let answer = await chatInstance.fetchAnswer(toolNotifier);
            answer = answer.replace(/\n/g, 'RENDER-MD-LF');
            res.send(answer);
        } catch (error) {
            console.error('Erreur dans query:', error);
            const errorMessage = `RENDER-MD-ERROR ${String(error)}`;
            res.status(500).send(errorMessage);
        }
    }

    public async stream(req: Request, res: Response): Promise<void> {
        const userId = this.getUserId(req, res);
        const conversationId = req.params.id as string;
        
        try {
            const chatInstance = await ChatModel.create(userId, conversationId);

            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            res.flushHeaders?.();

            const toolNotifier = (toolName: string) => {
                const notification = `\`\`\`[Outil appelé] ${toolName}\`\`\``;
                res.write(`event: token\ndata: ${notification.replace(/\n/g, 'RENDER-MD-LF')}\n\n`);
            };

            const stream = chatInstance.fetchAnswerStream(toolNotifier);
            for await (const token of stream) {
                const formatted = token.replace(/\n/g, 'RENDER-MD-LF');
                res.write(`event: token\ndata: ${formatted}\n\n`);
            }
            res.write(`event: close\ndata: \n\n`);
        } catch (error) {
            console.error('Erreur dans stream:', error);
            const message = `RENDER-MD-ERROR ${String(error)}`;
            res.write(`event: token\ndata: ${message}\n\n`);
            res.write(`event: close\ndata: \n\n`);
        } finally {
            res.end();
        }
    }

    public async newChat(req: Request, res: Response): Promise<void> {
        const userId = this.getUserId(req, res);
        const user = req.session.user;

        const chatInstance = await ChatModel.create(userId);

        const page = ChatView({
            conversationId: chatInstance.chatId,
            messages: [],
            chatTitle: chatInstance.title || "Nouvelle conversation",
            user,
        });

        res.send(page);
    }

    public async editTitle(req: Request, res: Response): Promise<void> {
        const chatId = req.params.id;
        const chat = await chatRepository.find(chatId);

        const component = TitleEdit({ title: chat.title, chatId });
        res.send(component);
    }

    public async displayTitle(req: Request, res: Response): Promise<void> {
        const chatId = req.params.id;
        const chat = await chatRepository.find(chatId);

        const component = ChatTitleDisplay({ title: chat.title, chatId });
        res.send(component);
    }

    public async updateTitle(req: Request, res: Response): Promise<void> {
        const chatId = req.params.id;
        const { title } = req.body;

        if (!title || typeof title !== "string" || title.trim().length === 0) {
            const chat = await chatRepository.find(chatId);
            const component = ChatTitleDisplay({
                title: chat.title,
                chatId,
            });
            res.status(400).send(component);
            return;
        }

        await chatRepository.updateTitle(chatId, title);
        const component = ChatTitleDisplay({ title, chatId });
        res.send(component);
    }

    public async list(req: Request, res: Response): Promise<void> {
        const user = userController.getUserFromSession(req, res);

        let page = parseInt(req.query.page as string, 10);
        if (isNaN(page) || page < 1) page = 1;

        const pageSize = 5;
        const searchText = (req.query.searchText as string) || '';
        const { count, chatInfos } = await chatRepository.aggregateByUserId(
            idAsString(user._id),
            pageSize,
            page,
            searchText
        );

        const isHxRequest = !!req.header('HX-Request');

        if (isHxRequest) {
            res.send(ChatList({ user, chatInfos, page, pageSize, totalCount: count, searchText }));
        } else {
            res.send(ChatListPage({ user, chatInfos, page, pageSize, totalCount: count, searchText }));
        }
    }


    public async open(req: Request, res: Response): Promise<void> {
        const user = userController.getUserFromSession(req, res);
        const userId = idAsString(user._id);
        const conversationId = req.params.id as string;

        const chatExists = await chatRepository.exists(conversationId);
        if (!chatExists) {
            res.status(404).send('Conversation non trouvée');
            return;
        }

        const chat = await chatRepository.find(conversationId);

        const chatInstance = await ChatModel.create(userId, conversationId);
        const messages = await chatInstance.messages();

        const page = ChatView({
            conversationId: chatInstance.chatId,
            messages,
            chatTitle: chat.title,
            user,
        });

        res.send(page);
    }

    public async searchForm(req: Request, res: Response): Promise<void> {
        const searchText = (req.query.searchText as string) || '';
        res.send(ChatSearchForm({ searchText }));
    }


    public async delete(req: Request, res: Response): Promise<void> {
        const chatId = req.params.id as string;

        const deleted = await chatRepository.delete(chatId);

        if (deleted) {
            const userId = req.session.user?._id?.toString();
            let remainingCount = 0;

            if (userId) {
                const { count } = await chatRepository.aggregateByUserId(userId, 1, 1);
                remainingCount = count;
            }

            res.status(200).send(ChatCount({ count: remainingCount }));
        } else {
            res.sendStatus(404);
        }
    }
}

export const chatController = new ChatController();
