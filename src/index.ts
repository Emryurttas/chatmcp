import express, { NextFunction, Request, Response } from 'express';
import { HomeView } from './views/home';
import { ErrorPageView } from './views/error/error-page';

const app = express();
const port = process.env.PORT;

app.use(express.static('public'));

app.get('/', (req: Request, res: Response) => {
    const page = HomeView( {title:"Acceuil"} );
    res.send(page);
});

app.get('/chat', (req: Request, res: Response) => {
    const now = new Date();
    const heure = now.toLocaleTimeString('fr-FR');
    res.send(`Bonjour. Il est ${heure}.`);
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