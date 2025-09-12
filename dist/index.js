"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 7000;
app.get('/', (req, res) => {
    res.send('Bonjour');
});
app.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map