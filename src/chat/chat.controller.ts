/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { ok } from 'assert';
import { ChatModel } from './chat.model';
import { ChatView } from './views/chat';
import { ChatItemView } from './views/chat-item';
import { ChatItemStreamView } from "./views/chat-item-stream";
import { chatRepository } from './chat.repository';
import { TitleEdit } from './views/titleEdit';
import { ChatTitleDisplay } from './views/chat-title';

export class ChatController {
    public async chat(req: Request, res: Response): Promise<void> {
        ok(req.session.user);
        const user = req.session.user as any;
        const userId = user.id;
        let chatInstance: ChatModel;

        const lastChat = await chatRepository.findLastByUser(userId);
        if (lastChat && lastChat._id) {
            chatInstance = await ChatModel.create(userId, lastChat._id.toHexString());
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
        ok(req.session.user);
        const userId = (req.session.user as any).id;
        const prompt = req.body.prompt;
        const streamingMode = req.body.streamingMode === 'true';
        const conversationId = req.params.id as string;
        let chatInstance: ChatModel;

        chatInstance = await ChatModel.create(userId, conversationId);

        await chatInstance.addPrompt(prompt);

        let chatItemHtml;
        if (streamingMode) {
            chatItemHtml = ChatItemStreamView({ prompt, id: conversationId });
        } else {
            chatItemHtml = ChatItemView({ prompt, id: conversationId });
        }

        res.send(chatItemHtml);
    }

    public async query(req: Request, res: Response): Promise<void> {
        ok(req.session.user);
        const userId = (req.session.user as any).id;
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
    }

    public async stream(req: Request, res: Response): Promise<void> {
        ok(req.session.user);
        const userId = (req.session.user as any).id;
        const conversationId = req.params.id as string;
        const chatInstance = await ChatModel.create(userId, conversationId);

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders?.();

        const notifications: string[] = [];

        const toolNotifier = (toolName: string) => {
            const notification = `\`\`\`[Outil appelé] ${toolName}\`\`\``;
            notifications.push(notification);
            res.write(`event: token\ndata: ${notification}\n\n`);
        };
        try {
            const stream = chatInstance.fetchAnswerStream(toolNotifier);

            for await (const token of stream) {
                const formatted = token.replace(/\n/g, 'RENDER-MD-LF');
                res.write(`event: token\ndata: ${formatted}\n\n`);
            }

            res.write(`event: close\ndata: \n\n`);
        } catch (error) {
            const message = `RENDER-MD-ERROR ${String(error)}`;
            res.write(`event: token\ndata: ${message}\n\n`);
            
            res.write(`event: close\ndata: \n\n`);
        } finally {
            res.end();
        }
    }
    public async newChat(req: Request, res: Response): Promise<void> {
        ok(req.session.user);
        const user = req.session.user as any;
        const userId = user.id;

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
}

export const chatController = new ChatController();
