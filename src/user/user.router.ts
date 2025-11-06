import { Router } from 'express';
import { userController } from './user.controller';

const userRouter = Router();

userRouter.get('/user/all', userController.showUser.bind(userController));


export default userRouter;
