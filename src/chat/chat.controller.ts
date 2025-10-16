import { Request, Response } from 'express';
import { ChatModel } from './chat.model';
import { ChatView } from './views/chat';
import { ChatItemView } from './views/chat-item';

export class ChatController {
    public chat(req: Request, res: Response): void {
        const chatInstance = new ChatModel();
        const conversationId = chatInstance.chatId;
        const page = ChatView({ conversationId });
        res.send(page);
    }

    public sendPrompt(req: Request, res: Response): void {
        const prompt = req.body.prompt;
        const conversationId = req.params.id as string;
        const chatInstance = new ChatModel(conversationId);
        chatInstance.addPrompt(prompt);
        const chatItemHtml = ChatItemView({ prompt, id: conversationId });
        res.send(chatItemHtml);
    }

    public async query(req: Request, res: Response): Promise<void> {
        const conversationId = req.params.id;
        const chatInstance = new ChatModel(conversationId);
        const answer = await chatInstance.fetchAnswer();
        res.send(answer);
    }
}

export const chatController = new ChatController();
