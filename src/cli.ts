import { ChatModel } from './chat/chat.model';
import { createInterface } from "readline/promises";

const readLine = createInterface({
    input: process.stdin,
    output: process.stdout
});

const COLOR_ANSWER = '\x1b[96m';
const COLOR_USER = '\x1b[92m';
const COLOR_DEFAULT = '\x1b[0m';

async function main(config: { streaming: boolean }) {

    const userId = "cli-user"; 

    const chat = await ChatModel.create(userId);

    console.log(`${COLOR_ANSWER}Bonjour ! Tapez votre question (vide pour quitter).${COLOR_DEFAULT}`);

    while (true) {
        const userInput = await readLine.question(`${COLOR_USER}jm: ${COLOR_DEFAULT}`);

        if (!userInput.trim()) {
            console.log("Fin du programme.");
            break;
        }

        await chat.addPrompt(userInput);

        const toolNotifier = (toolName: string) => {
            console.log(`${COLOR_ANSWER}\`\`\`[Outil appelé] ${toolName}\`\`\`${COLOR_DEFAULT}`);
        };

        if (config.streaming) {
            process.stdout.write(`${COLOR_ANSWER}ChatBot: `);

            for await (const chunk of chat.fetchAnswerStream(toolNotifier)) {
                process.stdout.write(chunk);
            }
            console.log(COLOR_DEFAULT);
        } else {
            const answer = await chat.fetchAnswer(toolNotifier);
            console.log(`${COLOR_ANSWER}ChatBot: ${answer}${COLOR_DEFAULT}`);
        }
    }

    readLine.close();
}

main({ streaming: true });
