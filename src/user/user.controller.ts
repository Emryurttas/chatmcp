import { Request, Response } from 'express';
import { UserView } from './views/user';
import { userRepository } from './user.repository';

export class UserController{
    public async showUser(req: Request, res: Response): Promise<void> {

        const users = await userRepository.findAll();
        const page = UserView({users});

        res.send(page);
    }
}
export const userController = new UserController();