import { Router } from 'express';
import { chatController } from './chat.controller';
import { z } from 'zod';
import { validateBody } from '../utils/validator';
import { validateParams } from '../utils/validateParams';

const router = Router();

export const promptSchema = z.object({
    prompt: z.string().min(1, "Le prompt ne peut pas être vide"),
});

export const paramsSchema = z.object({
    id: z.string().min(1, "L'identifiant de conversation est requis"),
});

router.get('/chat', chatController.chat.bind(chatController));

router.post(
    '/chat/send/:id',
    validateParams(paramsSchema),
    validateBody(promptSchema),
    chatController.sendPrompt.bind(chatController)
);

export default router;
