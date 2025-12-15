import { Router } from 'express';
import { userController } from './user.controller';
import { z } from 'zod';
import { validateBody } from '../utils/validator';

const userRouter = Router();

const loginSchema = z.object({
  userName: z.string().min(1, "Le nom d'utilisateur est requis"),
  password: z.string().min(1, "Mot de passe requis"),
});

const updateEmailSchema = z.object({
  email: z.string().email("Email invalide")
});


userRouter.get('/user/all', userController.showUser.bind(userController));

userRouter.get('/user/login', userController.loginForm.bind(userController));

userRouter.post(
  '/user/login',
  validateBody(loginSchema),
  userController.login.bind(userController)
);

userRouter.get('/user/logout', userController.logout.bind(userController));

userRouter.get('/user/profile', userController.profile.bind(userController));

userRouter.get('/user/editEmail', userController.editEmail.bind(userController));

userRouter.get('/user/displayEmail', userController.displayEmail.bind(userController));

userRouter.get('/user/:id/avatar', userController.avatar.bind(userController));

userRouter.post(
  '/user/updateEmail',
  validateBody(updateEmailSchema),
  userController.updateEmail.bind(userController)
);

export default userRouter;
