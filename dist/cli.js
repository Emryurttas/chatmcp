"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_model_1 = require("./chat/chat.model");
const promises_1 = require("readline/promises");
const readLine = (0, promises_1.createInterface)({
    input: process.stdin,
    output: process.stdout
});
async function main() {
    const chat = new chat_model_1.ChatModel();
    while (true) {
        const userInput = await readLine.question("Saisir un prompt (vide pour quitter) : ");
        if (!userInput.trim()) {
            console.log("Fin");
            break;
        }
        const answer = await chat.send(userInput);
        console.log(answer);
    }
    readLine.close();
}
main();
//# sourceMappingURL=cli.js.map