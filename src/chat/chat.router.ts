import { Router } from 'express';
import { chatController } from './chat.controller';
import { z } from 'zod';
import { validateBody } from '../utils/validator';
import { validateParams } from '../utils/validateParams';
import { connectionRequired } from '../user/user.middleware';

const router = Router();

export const promptSchema = z.object({
    prompt: z.string().min(1, "Le prompt ne peut pas être vide"),
});

export const paramsSchema = z.object({
    id: z.string().min(1, "L'identifiant de conversation est requis"),
});

router.get('/chat', connectionRequired, chatController.chat.bind(chatController));

router.post(
    '/chat/send/:id',
    connectionRequired,
    validateParams(paramsSchema),
    validateBody(promptSchema),
    chatController.sendPrompt.bind(chatController)
);

router.get(
    '/chat/query/:id',
    connectionRequired,
    validateParams(paramsSchema),
    chatController.query.bind(chatController)
);

router.get(
    '/chat/stream/:id',
    connectionRequired,
    validateParams(paramsSchema),
    chatController.stream.bind(chatController)
);

router.get('/chat/new', connectionRequired, chatController.newChat.bind(chatController));


export default router;
