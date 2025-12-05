import { ObjectId } from "bson";
import { mongodb } from "../services/mongo";
import { Chat } from "./chat";
import { ModelMessage } from "ai";


class ChatRepository {
    private readonly collection = mongodb.collection<Chat>('chats');

    async clear(): Promise<void> {
        await this.collection.deleteMany({});
    }

    async create(userId: string): Promise<string> {
        const now = new Date();

        const chat: Chat = {
            userId: new ObjectId(userId),
            title: "Nouvelle conversation",
            creationDate: now,
            lastModificationDate: now,
            messages: []
        };

        const result = await this.collection.insertOne(chat);
        return result.insertedId.toHexString();
    }

    async exists(chatId: string): Promise<boolean> {
        const id = new ObjectId(chatId);
        const count = await this.collection.countDocuments({ _id: id }, { limit: 1 });
        return count === 1;
    }

    async find(chatId: string): Promise<Chat> {
        const id = new ObjectId(chatId);
        const chat = await this.collection.findOne({ _id: id });

        if (!chat) {
            throw new Error(`chatId invalide : ${chatId}`);
        }

        return chat;
    }

    async addMessages(chatId: string, messages: ModelMessage[]): Promise<void> {
        if (messages.length === 0) return;

        const id = new ObjectId(chatId);
        const now = new Date();

        const result = await this.collection.updateOne(
            { _id: id },
            {
                $push: { messages: { $each: messages } },
                $set: { lastModificationDate: now }
            }
        );

        if (result.matchedCount === 0) {
            throw new Error(`chatId invalide : ${chatId}`);
        }
    }
}

export const chatRepository = new ChatRepository();