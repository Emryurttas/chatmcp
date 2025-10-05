import { google } from '@ai-sdk/google';
import { generateText, streamText, smoothStream } from 'ai';
import { ChatRepository } from './chat.repository';

const MODEL_NAME = google('gemini-2.0-flash');

type ModelMessage = {
    role: 'user' | 'bot';
    content: string;
};

export class ChatModel {
    private _chatId: string;
    private static repository = new ChatRepository<ModelMessage>();

    constructor(chatId?: string) {
        if (chatId) {
            const exists = ChatModel.repository.find(chatId);
            if (!exists) {
                throw new Error(`${chatId} "introuvable."`);
            }
            this._chatId = chatId;
        } else {
            this._chatId = ChatModel.repository.create([]);
        }
    }

    get chatId(): string {
        return this._chatId;
    }

    addPrompt(prompt: string): void {
        ChatModel.repository.addMessages(this._chatId, [{ role: 'user', content: prompt }]);
    }

    private createGenerationConfig() {
        const messages = ChatModel.repository.find(this._chatId);

        return {
            model: MODEL_NAME,
            messages: messages.map(m => {
                const role: 'user' | 'assistant' = m.role === 'bot' ? 'assistant' : 'user';
                return {
                    role,
                    content: m.content,
                };
            }),
        };
    }
    async fetchAnswer(): Promise<string> {
        const config = this.createGenerationConfig();
        const { text, response } = await generateText(config);

        if (response.messages) {
            ChatModel.repository.addMessages(this._chatId, [{ role: 'bot', content: text }]);
        }
        return text;
    }

   
    async *fetchAnswerStream(): AsyncGenerator<string> {
        const config = this.createGenerationConfig();

        const result = streamText({
            ...config,
            experimental_transform: smoothStream({
                delayInMs: 50,
                chunking: 'word',
            }),
        });

        let accumulated = "";

        for await (const textPart of result.textStream) {
            accumulated += textPart;
            yield textPart;
        }

        ChatModel.repository.addMessages(this._chatId, [
            { role: 'bot', content: accumulated },
        ]);
    }
}
