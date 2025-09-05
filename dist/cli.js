"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_model_1 = require("./chat/chat.model");
async function main() {
    const chat = new chat_model_1.ChatModel();
    const answer = await chat.send("Bonjour");
    console.log(answer);
}
main();
//# sourceMappingURL=cli.js.map