"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const home_1 = require("./views/home");
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/', (req, res) => {
    const page = (0, home_1.HomeView)({ title: "Acceuil" });
    res.send(page);
});
app.get('/chat', (req, res) => {
    const now = new Date();
    const heure = now.toLocaleTimeString('fr-FR');
    res.send(`Bonjour. Il est ${heure}.`);
});
app.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map