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
        console.log(prompt);

        const chatItemHtml = ChatItemView({ prompt });

        res.send(chatItemHtml);
    }
}

export const chatController = new ChatController();
