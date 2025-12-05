import { google } from '@ai-sdk/google';
import { generateText, streamText, smoothStream, ToolSet, stepCountIs, StepResult } from 'ai';
import { Experimental_StdioMCPTransport } from "ai/mcp-stdio";
import { chatRepository } from './chat.repository1';
import { experimental_createMCPClient as createMCPClient } from 'ai';

const MODEL_NAME = google('gemini-2.0-flash');

export type Segment = { type: 'text'; text: string };

export type ModelMessage = {
    role: 'user' | 'assistant';
    content: string | Segment[];
};

export class ChatModel {
    private _chatId: string;
    private static _tools: ToolSet | null = null;

    static async create(userId: string, chatId?: string): Promise<ChatModel> {
        if (chatId) {
            const exists = await chatRepository.find(chatId);
            if (!exists) {
                throw new Error(`${chatId} introuvable.`);
            }
            return new ChatModel(chatId);
        } else {
            const newChatId = await chatRepository.create(userId);
            return new ChatModel(newChatId);
        }
    }

    private constructor(chatId: string) {
        this._chatId = chatId;
    }

    get chatId(): string {
        return this._chatId;
    }

    async messages(): Promise<ModelMessage[]> {
        const chat = await chatRepository.find(this._chatId);
        return (chat.messages ?? [])
            .filter(m => m.role === 'user' || m.role === 'assistant')
            .map(m => ({
                role: m.role as 'user' | 'assistant',
                content: Array.isArray(m.content)
                    ? m.content
                        .filter(part => 'text' in part)
                        .map(part => ({ type: 'text', text: (part as any).text }))
                    : m.content ?? ''
            }));
    }

    async addPrompt(prompt: string): Promise<void> {
        await chatRepository.addMessages(this._chatId, [{ role: 'user', content: prompt }]);
    }

    async createGenerationConfig(toolCallNotification: (toolName: string) => void) {
        const messages = await this.messages();

        if (ChatModel._tools === null) {
            const timeTransport = new Experimental_StdioMCPTransport({
                command: 'node',
                args: ['/home/butinfo/mcp-servers/mcp-time/dist/server.js'],
            });
            const timeClient = await createMCPClient({ transport: timeTransport });
            const timeTools = await timeClient.tools();
            const osmTransport = new Experimental_StdioMCPTransport({
                command: '/home/butinfo/bin/uvx',
                args: ['osm-mcp-server'],
            });
            const osmClient = await createMCPClient({ transport: osmTransport });

            const osmTools = await osmClient.tools();
            ChatModel._tools = {
                ...timeTools,
                ...osmTools
            };
        }

        return {
            model: MODEL_NAME,
            tools: ChatModel._tools,
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
