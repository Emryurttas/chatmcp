import { ObjectId } from "bson";
import { mongodb } from "../services/mongo";
import { Chat } from "./chat";
import { ModelMessage } from "ai";
import { valkey } from "../services/valkey";

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
        const chatId = result.insertedId.toHexString();

        chat._id = result.insertedId;
        await this.writeToCache(chat);

        return chatId;
    }

    async exists(chatId: string): Promise<boolean> {
        const id = new ObjectId(chatId);
        const count = await this.collection.countDocuments({ _id: id }, { limit: 1 });
        return count === 1;
    }

    async find(chatId: string): Promise<Chat> {
        const cachedChat = await this.readFromCache(chatId);
        if (cachedChat) return cachedChat;

        const id = new ObjectId(chatId);
        const chat = await this.collection.findOne({ _id: id });
        if (!chat) throw new Error(`chatId invalide : ${chatId}`);

        await this.writeToCache(chat);
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

        const chat = await this.find(chatId);
        await this.writeToCache(chat);
    }

    async findLastByUser(userId: string): Promise<Chat | null> {
        const chats = await this.collection
            .find({ userId: new ObjectId(userId) })
            .sort({ lastModificationDate: -1 })
            .limit(1)
            .toArray();

        if (chats.length === 0) return null;

        const cachedChat = await this.readFromCache(chats[0]._id!.toHexString());
        if (cachedChat) return cachedChat;

        await this.writeToCache(chats[0]);
        return chats[0];
    }

    async updateTitle(id: string | ObjectId, title: string): Promise<void> {
        const _id = typeof id === "string" ? new ObjectId(id) : id;

        await this.collection.updateOne(
            { _id },
            { $set: { title } }
        );

        const chat = await this.find(_id.toHexString());
        await this.writeToCache(chat);
    }

    async writeToCache(chat: Chat): Promise<void> {
        if (!chat._id) {
            throw new Error("Impossible de mettre en cache un chat sans id");
        }

        const key = `chat:${chat._id.toHexString()}`;
        await valkey.set(key, JSON.stringify(chat));
    }

    async readFromCache(chatId: string): Promise<Chat | undefined> {
        const key = `chat:${chatId}`;
        const cached = await valkey.get(key);

        if (!cached) {
            return undefined;
        }

        const chat: Chat = JSON.parse(cached, (k, v) => {
            if (k === "creationDate" || k === "lastModificationDate") {
                return new Date(v);
            }
            return v;
        });

        console.log(`Utilisation des données mises en cache pour le chatId : ${chatId}`);
        return chat;
    }
}

export const chatRepository = new ChatRepository();