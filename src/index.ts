import express, { Request, Response } from 'express';

const app = express();
const port = 7000;

app.get('/', (req: Request, res: Response) => {
    res.send('Bonjour');
});

app.get('/chat', (req: Request, res: Response) => {
    const now = new Date();
    const heure = now.toLocaleTimeString('fr-FR');
    res.send(`Bonjour. Il est ${heure}.`);
});

app.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});