import { Router } from 'express';
import { userController } from './user.controller';

const userRouter = Router();

userRouter.get('/user/all', userController.showUser);
userRouter.get('/user/login', userController.loginForm)
userRouter.post('/user/login', userController.login)


export default userRouter;
