export declare class ChatRepository<Message> {
    private chats;
    create(chat: Message[]): string;
    exists(chatId: string): boolean;
    find(chatId: string): Message[];
    addMessages(chatId: string, messages: Message[]): void;
}
//# sourceMappingURL=chat.repository.d.ts.map