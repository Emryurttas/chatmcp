import { ChatModel } from './chat/chat.model';

async function main() {
    const chat = new ChatModel();
    const answer = await chat.send("Bonjour");
    console.log(answer);
}

main();