import { Router } from 'express';
import { userController } from './user.controller';
import { z } from 'zod';
import { validateBody } from '../utils/validator';

const userRouter = Router();

const loginSchema = z.object({
  userName: z.string().min(1, "Le nom d'utilisateur est requis"),
  password: z.string().min(1, "Mot de passe requis"),
});

userRouter.get('/user/all', userController.showUser.bind(userController));

userRouter.get('/user/login', userController.loginForm.bind(userController));

userRouter.post(
  '/user/login',
  validateBody(loginSchema),
  userController.login.bind(userController)
);

export default userRouter;
