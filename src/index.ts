import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import fileUpload from 'express-fileupload';
import { valkeyStore } from './services/valkey';
import { HomeView } from './views/home';
import { ErrorPageView } from './views/error/error-page';
import { ErrorDialogView } from './chat/views/error-dialog';
import chatRouter from './chat/chat.router';
import userRouter from './user/user.router';
import discussRouter from './discuss/discuss.router';
import { createServer } from 'http';
import { DiscussServer } from './discuss/discuss.server';

const port = process.argv[2] || process.env.PORT || 7000;

const app = express();

const sessionMiddleware = session({
    store: valkeyStore,
    secret: 'cc46091749e55f33fe4046b9c8855a13',
    saveUninitialized: false,
    resave: false
});

app.use(sessionMiddleware);
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));
app.use(fileUpload({ limits: { fileSize: 5 * 1024 * 1024 }, abortOnLimit: true, createParentPath: true }));

app.get('/', (req: Request, res: Response) => {
    const homeViewProps: { title: string; user?: { userName: string } } = {
        title: "Accueil"
    };
    if (req.session.user) {
        homeViewProps.user = { userName: req.session.user.userName };
    }
    const page = HomeView(homeViewProps);
    res.send(page);
});

app.use('/', chatRouter);
app.use('/', userRouter);
app.use('/', discussRouter);

app.get('/time', (req: Request, res: Response) => {
    const now = new Date();
    const heure = now.toLocaleTimeString('fr-FR');
    res.send(`<button id="heure-btn" hx-get="/time" hx-target="#heure-btn" hx-swap="outerHTML">${heure}</button>`);
});

app.get('/erreur', () => {
    throw new Error("Ceci est une erreur ");
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (req.headers['hx-request']) {
        res.send(ErrorDialogView({ message: err.message }));
    } else {
        res.send(ErrorPageView({ message: err.message }));
    }
});

const httpServer = createServer(app);
DiscussServer.create(httpServer, sessionMiddleware);

httpServer.listen(port, () => {
    console.log(`Serveur local démarré sur http://localhost:${port}`);
});
