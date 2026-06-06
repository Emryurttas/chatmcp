import { google } from '@ai-sdk/google';
import { generateText, streamText, smoothStream, ToolSet, stepCountIs, StepResult, ModelMessage } from 'ai';
import { chatRepository } from './chat.repository';

const MODEL_NAME = google('models/gemini-2.5-flash');

export class ChatModel {
    private _chatId: string;
    private _title: string;

    static async create(userId: string, chatId?: string): Promise<ChatModel> {
        if (chatId) {
            const exists = await chatRepository.find(chatId);
            if (!exists) {
                throw new Error(`${chatId} introuvable.`);
            }
            return new ChatModel(chatId, exists.title);
        } else {
            const newChatId = await chatRepository.create(userId);
            const chat = await chatRepository.find(newChatId);
            return new ChatModel(newChatId, chat.title);
        }
    }

    private constructor(chatId: string, title: string) {
        this._chatId = chatId;
        this._title = title;
    }

    get chatId(): string {
        return this._chatId;
    }

    get title(): string {
        return this._title;
    }

    async messages(): Promise<ModelMessage[]> {
        const chat = await chatRepository.find(this._chatId);
        return chat.messages ?? [];
    }

    async addPrompt(prompt: string): Promise<void> {
        await chatRepository.addMessages(this._chatId, [{ role: 'user', content: prompt }]);
    }

    async createGenerationConfig(toolCallNotification: (toolName: string) => void) {
        const messages = await this.messages();
        const tools: ToolSet = {};

        return {
            model: MODEL_NAME,
            tools,
            stopWhen: stepCountIs(10),
            onStepFinish: (result: StepResult<ToolSet>): void => {
                if (result.dynamicToolCalls) {
                    for (const call of result.dynamicToolCalls) {
                        if (call.toolName) {
                            toolCallNotification(call.toolName);
                        }
                    }
                }
            },
            messages: messages
        };
    }

    async fetchAnswer(toolCallNotification: (toolName: string) => void): Promise<string> {
        const config = await this.createGenerationConfig(toolCallNotification);
        const { text, response } = await generateText(config);

        if (response.messages) {
            await chatRepository.addMessages(this._chatId, [{ role: 'assistant', content: text }]);
        }
        return text;
    }

    async *fetchAnswerStream(toolCallNotification: (toolName: string) => void): AsyncGenerator<string> {
        const config = await this.createGenerationConfig(toolCallNotification);

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

        await chatRepository.addMessages(this._chatId, [
            { role: 'assistant', content: accumulated },
        ]);
    }
}