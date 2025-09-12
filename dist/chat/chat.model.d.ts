export declare class ChatModel {
    private _chatId;
    private static repository;
    constructor();
    send(prompt: string): Promise<string>;
    addPrompt(prompt: string): void;
    get chatId(): string;
}
//# sourceMappingURL=chat.model.d.ts.map