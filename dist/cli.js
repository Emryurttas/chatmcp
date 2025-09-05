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
    let isDone = false;
    const answer = await chat.send("Bonjour");
    console.log(answer);
    const question = readLine.question("saisir");
    while (isDone === false) {
        const answer_next = await chat.send(await question);
        if (answer_next == undefined) {
            isDone = true;
        }
    }
}
main();
//# sourceMappingURL=cli.js.map