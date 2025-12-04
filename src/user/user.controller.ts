import { Request, Response } from 'express';
import { UserView } from './views/user';
import { loginForm } from './views/loginForm';
import { userRepository } from './user.repository';
import bcrypt from 'bcrypt';
import { ObjectId } from 'bson';
import { User } from './user';
import { EmailDisplay, ProfilePage } from './views/profile';
import { EmailEdit } from './views/emailEdit';

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

    public getUserFromSession(req: Request, res: Response): User {
        const user = req.session.user;
        if (!user) {
            throw new Error("Aucun utilisateur connecté");
        }
        user._id = new ObjectId(user._id);
        return user;
    }

    public profile(req: Request, res: Response): void {
        const user = this.getUserFromSession(req, res);

        const page = ProfilePage({ user });
        res.send(page);
    }

    public editEmail(req: Request, res: Response): void {
        const user = this.getUserFromSession(req, res);
        const component = EmailEdit({ email: user.email });
        res.send(component);
    }

    public displayEmail(req: Request, res: Response): void {
        const user = this.getUserFromSession(req, res);
        const component = EmailDisplay({ email: user.email });
        res.send(component);
    }

    public async updateEmail(req: Request, res: Response): Promise<void> {
        try {
            const user = this.getUserFromSession(req, res);
            const { email } = req.body;

            if (!email || typeof email !== 'string') {
                const component = EmailDisplay({ email: user.email, message: "Email invalide" });
                res.status(400).send(component);
                return;
            }

            if (!user._id) {
                const component = EmailDisplay({ email: user.email, message: "ID utilisateur manquant" });
                res.status(400).send(component);
                return;
            }

            await userRepository.updateEmail(user._id.toString(), email);

            user.email = email;
            if (req.session.user) req.session.user.email = email;

            const component = EmailDisplay({ email });
            res.send(component);

        } catch (err) {
            const user = req.session.user;
            const component = EmailDisplay({ email: user?.email || "", message: "Erreur lors de la mise à jour." });
            res.status(500).send(component);
        }
    }
}
export const userController = new UserController();