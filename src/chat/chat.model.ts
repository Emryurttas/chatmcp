import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const MODEL_NAME = google('gemini-2.0-flash');

export class ChatModel {
    async send(prompt: string): Promise<string> {
        
        const {text} = await generateText({
            model: MODEL_NAME,
            prompt: prompt
        })
        return text
    }
}
