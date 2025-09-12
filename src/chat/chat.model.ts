import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { ChatRepository } from './chat.repository';

const MODEL_NAME = google('gemini-2.0-flash');

type ModelMessage = {
    role: 'user' | 'bot';
    content: string;
}

export class ChatModel {
    private _chatId: string;
    private static repository = new ChatRepository<ModelMessage>();

    constructor() {
        this._chatId = ChatModel.repository.create([]);
    }

    async send(prompt: string): Promise<string> {
        ChatModel.repository.addMessages(this._chatId, [{ role: 'user', content: prompt }]);

        const { text } = await generateText({
            model: MODEL_NAME,
            prompt: prompt
        });

        ChatModel.repository.addMessages(this._chatId, [{ role: 'bot', content: text }]);

        return text;
    }
    get chatId(): string {
        return this._chatId;
    }

    addPrompt(prompt: string): void {
        ChatModel.repository.addMessages(this._chatId, [{ role: 'user', content: prompt }]);
    }

    private createGenerationConfig(): GenerationConfig {
        const messages = ChatModel.repository.find(this._chatId);


        return {
            model: MODEL_NAME,
            messages,
        };
    }
}
