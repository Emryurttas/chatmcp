"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const home_1 = require("./views/home");
const error_page_1 = require("./views/error/error-page");
const chat_controller_1 = require("./chat/chat.controller");
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.static('public'));
app.get('/', (req, res) => {
    const page = (0, home_1.HomeView)({ title: "Acceuil" });
    res.send(page);
});
app.get('/chat', chat_controller_1.chatController.chat.bind(chat_controller_1.chatController));
app.get('/time', (req, res) => {
    const now = new Date();
    const heure = now.toLocaleTimeString('fr-FR');
    res.send(`<button id="heure-btn" hx-get="/time" hx-target="#heure-btn" hx-swap="outerHTML">${heure}</button>`);
});
app.get('/erreur', () => {
    throw new Error("Ceci est une erreur ");
});
app.use((err, req, res, next) => {
    console.log(`ERREUR : ${err.message}`);
    const page = (0, error_page_1.ErrorPageView)({ message: err.message });
    res.send(page);
});
app.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map