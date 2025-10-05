import { Router, Request, Response, NextFunction } from 'express';
import { chatController } from './chat.controller';
import { z } from 'zod';

const router = Router();

const promptSchema = z.object({
    prompt: z.string().min(1, "Le prompt ne peut pas être vide")
});

function validatePrompt(req: Request, res: Response, next: NextFunction) {
    const result = promptSchema.safeParse(req.body);

    if (!result.success) {
        const message = result.error.errors.map(err => err.message).join(', ');
        return res.status(400).send({ error: message });
    }

    next();
}

router.get('/chat', chatController.chat.bind(chatController));

router.post('/chat/send/:id', validatePrompt, chatController.sendPrompt.bind(chatController));

export default router;
