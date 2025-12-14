import { Router } from 'express';
import { chatController } from './chat.controller';
import { z } from 'zod';
import { validateBody } from '../utils/validator';
import { validateParams } from '../utils/validateParams';
import { connectionRequired } from '../user/user.middleware';
import { isChatOwner } from './chat.middleware';

const router = Router();

export const promptSchema = z.object({
    prompt: z.string().min(1, "Le prompt ne peut pas être vide"),
});

export const paramsSchema = z.object({
    id: z.string().min(1, "L'identifiant de conversation est requis"),
});

router.get('/chat', connectionRequired, chatController.chat.bind(chatController));
router.get('/chat/new', connectionRequired, chatController.newChat.bind(chatController));

router.post(
    '/chat/send/:id',
    connectionRequired,
    validateParams(paramsSchema),
    isChatOwner,
    validateBody(promptSchema),
    chatController.sendPrompt.bind(chatController)
);

router.get(
    '/chat/query/:id',
    connectionRequired,
    validateParams(paramsSchema),
    isChatOwner,
    chatController.query.bind(chatController)
);

router.get(
    '/chat/stream/:id',
    connectionRequired,
    validateParams(paramsSchema),
    isChatOwner,
    chatController.stream.bind(chatController)
);

router.get(
    '/chat/editTitle/:id',
    connectionRequired,
    validateParams(paramsSchema),
    isChatOwner,
    chatController.editTitle.bind(chatController)
);

router.get(
    '/chat/displayTitle/:id',
    connectionRequired,
    validateParams(paramsSchema),
    isChatOwner,
    chatController.displayTitle.bind(chatController)
);

router.post(
    '/chat/updateTitle/:id',
    connectionRequired,
    validateParams(paramsSchema),
    isChatOwner,
    chatController.updateTitle.bind(chatController)
);

router.get('/chat/list', connectionRequired, chatController.list.bind(chatController));


export default router;
