import { Request, Response } from 'express';
import { ChatModel } from './chat.model';
import { ChatView } from './views/chat';
import { ChatItemView } from './views/chat-item';
import {ChatItemStreamView} from "./views/chat-item-stream";

export class ChatController {
    public chat(req: Request, res: Response): void {
        const conversationId = req.query.id as string | undefined;
        let chatInstance: ChatModel;

        if (conversationId) {
            chatInstance = new ChatModel(conversationId);
        } else {
            chatInstance = new ChatModel();
        }

        const messages = chatInstance.messages ?? [];

        const page = ChatView({
            conversationId: chatInstance.chatId,
            messages,
        });

        res.send(page);
    }

    public sendPrompt(req: Request, res: Response): void {
        const prompt = req.body.prompt;
        const streamingMode = req.body.streamingMode === 'true';
        const conversationId = req.params.id as string;
        const chatInstance = new ChatModel(conversationId);
        chatInstance.addPrompt(prompt);

        let chatItemHtml;
        if (streamingMode) {
            chatItemHtml = ChatItemStreamView({ prompt, id: conversationId });
        } else {
            chatItemHtml = ChatItemView({ prompt, id: conversationId });
        }

        res.send(chatItemHtml);
    }

    public async query(req: Request, res: Response): Promise<void> {
        const conversationId = req.params.id as string;
        const chatInstance = new ChatModel(conversationId);
        let answer = await chatInstance.fetchAnswer();
        answer = answer.replace(/\n/g, 'RENDER-MD-LF');
        res.send(answer);
    }
}

export const chatController = new ChatController();
