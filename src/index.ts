import express, { Request, Response } from 'express';

const app = express();
const port = 7000;

app.get('/', (req: Request, res: Response) => {
    res.send('Bonjour');
});

app.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});