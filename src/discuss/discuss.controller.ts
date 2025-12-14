import { Request, Response } from 'express';
import { ChatModel } from '../chat/chat.model';
import { userController } from '../user/user.controller';
import { discussPageView } from './views/discuss-page';
import { idAsString } from '../utils/id-as-string';

export class DiscussController {
    private getUserId(req: Request, res: Response): string {
        const user = userController.getUserFromSession(req, res);
        return idAsString(user._id);
    }

    public async showDiscussPage(req: Request, res: Response): Promise<void> {
        const userId = this.getUserId(req, res);
        const user = req.session.user;

        const conversation = await ChatModel.create(userId);

        const page = discussPageView({
            conversationId: conversation.chatId,
            user,
            messages: []
        });

        res.send(page);
    }
}

export const discussController = new DiscussController();
