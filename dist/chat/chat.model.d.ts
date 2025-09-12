export declare class ChatModel {
    private _chatId;
    private static repository;
    constructor();
    send(prompt: string): Promise<string>;
    get chatId(): string;
    addPrompt(prompt: string): void;
    private createGenerationConfig;
}
//# sourceMappingURL=chat.model.d.ts.map