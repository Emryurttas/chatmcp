import { Request, Response } from 'express';

export class ChatController {
    public chat(req: Request, res: Response): void {
        const now = new Date();
        const heure = now.toLocaleTimeString('fr-FR');
        res.send(`Bonjour. Il est ${heure}.`);
    }
}
export const chatController = new ChatController();
