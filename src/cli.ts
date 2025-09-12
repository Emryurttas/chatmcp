import { ChatModel } from './chat/chat.model';
import { createInterface } from "readline/promises";

const readLine = createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    const chat = new ChatModel();

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