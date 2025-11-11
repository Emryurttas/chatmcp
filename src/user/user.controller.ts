import { Request, Response } from 'express';
import { UserView } from './views/user';
import { loginForm } from './views/loginForm';
import { userRepository } from './user.repository';
import bcrypt from 'bcrypt';
import { ObjectId } from 'bson';

export class UserController{
    public async showUser(req: Request, res: Response): Promise<void> {

        const users = await userRepository.findAll();
        const page = UserView({users});

        res.send(page);
    }
    public loginForm(req: Request, res: Response): void{
        const page = loginForm();
        res.send(page);
    }
    public async login(req: Request, res: Response): Promise<void> {
        const { userName, password } = req.body;

        const user = await userRepository.findByUserName(userName);
        if (!user) {
            throw new Error("Utilisateur introuvable");
        }
        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isPasswordValid) {
            throw new Error("Mot de passe incorrect");
        }

        req.session.regenerate((err) => {
            if (err) {
                throw err;
            }

            req.session.user = user;

            res.redirect('/');
        });
    }

    public logout(req: Request, res: Response): void {
        req.session.destroy(() => {
            res.redirect('/');
        });
    }

    public getUserFromSession(req: Request, res: Response) {
        const user = req.session.user;
        if (!user) {
            throw new Error("Aucun utilisateur connecté");
        }
        user._id = new ObjectId(user._id);
        return user;
    }

}
export const userController = new UserController();