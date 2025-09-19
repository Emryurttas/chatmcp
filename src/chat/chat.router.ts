import { Router } from 'express';
import { chatController } from './chat.controller';

const router = Router();

router.get('/chat', chatController.chat.bind(chatController));

export default router;

