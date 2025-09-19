import express, { Request, Response } from 'express';
import { HomeView } from './views/home';


const app = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
    const page = HomeView( {title:"Acceuil"} );
    res.send(page);
});

app.get('/chat', (req: Request, res: Response) => {
    const now = new Date();
    const heure = now.toLocaleTimeString('fr-FR');
    res.send(`Bonjour. Il est ${heure}.`);
});

app.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});