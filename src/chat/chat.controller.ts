import { Request, Response } from 'express';
import { ChatModel } from './chat.model';
import { ChatView } from './views/chat'

export class ChatController {
    public chat(req: Request, res: Response): void {
        const chatInstance = new ChatModel();
        const conversationId = chatInstance.chatId

        const page = ChatView({ conversationId })

        res.send(page);
    }
}
export const chatController = new ChatController();
