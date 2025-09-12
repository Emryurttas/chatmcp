export declare class ChatModel {
    private _chatId;
    private static repository;
    constructor();
    get chatId(): string;
    addPrompt(prompt: string): void;
    private createGenerationConfig;
    fetchAnswer(): Promise<string>;
}
//# sourceMappingURL=chat.model.d.ts.map