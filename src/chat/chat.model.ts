import { google } from '@ai-sdk/google';
import { generateText, streamText, smoothStream, ToolSet, stepCountIs, StepResult } from 'ai';
import { Experimental_StdioMCPTransport } from "ai/mcp-stdio"
import { ChatRepository } from './chat.repository';
import { experimental_createMCPClient as createMCPClient } from 'ai';


const MODEL_NAME = google('gemini-2.0-flash');

export type Segment = { type: 'text'; text: string };

export type ModelMessage = {
    role: 'user' | 'bot';
    content: string | Segment[];
};

export class ChatModel {
    private _chatId: string;
    private static repository = new ChatRepository<ModelMessage>();
    private static _tools: ToolSet | null = null;

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
    get messages(): ModelMessage[] {
        const msgs = ChatModel.repository.find(this._chatId);
        return msgs ?? [];
    }

    addPrompt(prompt: string): void {
        ChatModel.repository.addMessages(this._chatId, [{ role: 'user', content: prompt }]);
    }

    async createGenerationConfig(toolCallNotification: ( toolName : string ) => void) {
        const messages = ChatModel.repository.find(this._chatId);

        if (ChatModel._tools === null) {
            const transport = new Experimental_StdioMCPTransport({
                command: 'node',
                args: ['/home/butinfo/mcp-servers/mcp-time/dist/server.js'],
            });

            const client = await createMCPClient({ transport });
            ChatModel._tools = await client.tools();
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
            
            messages: messages.map(m => {
                const role: 'user' | 'assistant' = m.role === 'bot' ? 'assistant' : 'user';
                return {
                    role,
                    content: m.content,
                };
            }),
        };
    }
    
    async fetchAnswer(toolCallNotification: ( toolName : string ) => void): Promise<string> {
        const config = await this.createGenerationConfig(toolCallNotification);
        const { text, response } = await generateText(config);

        if (response.messages) {
            ChatModel.repository.addMessages(this._chatId, [{ role: 'bot', content: text }]);
        }
        return text;
    }

   
    async *fetchAnswerStream(toolCallNotification: ( toolName : string ) => void): AsyncGenerator<string> {
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

        ChatModel.repository.addMessages(this._chatId, [
            { role: 'bot', content: accumulated },
        ]);
    }

    
}
