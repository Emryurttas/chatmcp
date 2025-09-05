import { ChatModel } from './chat/chat.model';
import { createInterface } from "readline/promises";

const readLine = createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    const chat = new ChatModel();
    let isDone = false; 
    const answer = await chat.send("Bonjour");
    console.log(answer); 
    const question = readLine.question("saisir");
    while(isDone === false){
        const answer_next = await chat.send(await question);
        if (answer_next == undefined)
        {
            isDone = true
        }
    }
}

main();