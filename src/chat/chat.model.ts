import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { ChatRepository } from './chat.repository';

const MODEL_NAME = google('gemini-2.0-flash');

type ModelMessage = {
    role: 'user';
    content: string;
}

export class ChatModel {
    private _chatId: string;
    private static repository = new ChatRepository<ModelMessage>();

    constructor() {
        this._chatId = ChatModel.repository.create([]);
    }

    async send(prompt: string): Promise<string> {
        
        const {text} = await generateText({
            model: MODEL_NAME,
            prompt: prompt
        })
        return text
    }
}
