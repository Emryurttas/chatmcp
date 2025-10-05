import express, { NextFunction, Request, Response } from 'express';
import { HomeView } from './views/home';
import { ErrorPageView } from './views/error/error-page';
import chatRouter from './chat/chat.router';

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
    const page = HomeView( {title:"Acceuil"} );
    res.send(page);
});

app.use('/', chatRouter);

app.get('/time', (req: Request, res: Response) => {
    const now = new Date();
    const heure = now.toLocaleTimeString('fr-FR');
    res.send(`<button id="heure-btn" hx-get="/time" hx-target="#heure-btn" hx-swap="outerHTML">${heure}</button>`);
});

app.get('/erreur', () => {
    throw new Error("Ceci est une erreur ");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`ERREUR : ${err.message}`);
    const page = ErrorPageView({message: err.message});
    res.send(page);
});


app.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});