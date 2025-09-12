"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_model_1 = require("./chat/chat.model");
const promises_1 = require("readline/promises");
const readLine = (0, promises_1.createInterface)({
    input: process.stdin,
    output: process.stdout
});
const COLOR_ANSWER = '\x1b[96m';
const COLOR_USER = '\x1b[92m';
const COLOR_DEFAULT = '\x1b[0m';
async function main() {
    const chat = new chat_model_1.ChatModel();
    console.log(`${COLOR_ANSWER}Bonjour ! Tapez votre question (vide pour quitter).${COLOR_DEFAULT}`);
    while (true) {
        const userInput = await readLine.question(`${COLOR_USER}jm: ${COLOR_DEFAULT}`);
        if (!userInput.trim()) {
            console.log("Fin du programme.");
            break;
        }
        const answer = await chat.send(userInput);
        console.log(`${COLOR_ANSWER}ChatBot: ${answer}${COLOR_DEFAULT}`);
    }
    readLine.close();
}
main();
//# sourceMappingURL=cli.js.map