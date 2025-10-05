import { Router } from 'express';
import { chatController } from './chat.controller';
import { z } from 'zod';
import { validateBody } from '../utils/validator';

const router = Router();

export const promptSchema = z.object({
    prompt: z.string().min(1, "Le prompt ne peut pas être vide")
});

router.get('/chat', chatController.chat.bind(chatController));

router.post(
    '/chat/send/:id',
    validateBody(promptSchema),
    chatController.sendPrompt.bind(chatController)
);

export default router;
