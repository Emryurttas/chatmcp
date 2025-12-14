import { ObjectId } from "bson";
import { mongodb } from "../services/mongo";
import { Chat, ChatInfo } from "./chat";
import { ModelMessage } from "ai";
import { valkey } from "../services/valkey";
import { idAsString } from "../utils/id-as-string";

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
        const chatId = idAsString(result.insertedId);

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

        const updatedChat = await this.collection.findOne({ _id: id });
        if (updatedChat) {
            await this.writeToCache(updatedChat);
        }
    }

    async findLastByUser(userId: string): Promise<Chat | null> {
        const chats = await this.collection
            .find({ userId: new ObjectId(userId) })
            .sort({ lastModificationDate: -1 })
            .limit(1)
            .toArray();

        if (chats.length === 0) return null;

        const chat = chats[0];
        await this.writeToCache(chat);
        return chat;
    }

    async updateTitle(id: string | ObjectId, title: string): Promise<void> {
        const _id = typeof id === "string" ? new ObjectId(id) : id;

        await this.collection.updateOne(
            { _id },
            { $set: { title } }
        );

        const chat = await this.collection.findOne({ _id });
                if (chat) {
            await this.writeToCache(chat);
        }
    }

    async writeToCache(chat: Chat): Promise<void> {
        if (!chat._id) {
            throw new Error("Impossible de mettre en cache un chat sans id");
        }

        const key = `chat:${idAsString(chat._id)}`;
        
        const serialized = JSON.stringify(chat, (k, v) => {
            if (v instanceof ObjectId) {
                return v.toString();
            }
            return v;
        });
        
        await valkey.set(key, serialized);
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
            if (k === "userId" || k === "_id") {
                return new ObjectId(v);
            }
            return v;
        });

        console.log(`Utilisation des données mises en cache pour le chatId : ${chatId}`);
        return chat;
    }

    async aggregateByUserId(userId: string, pageSize: number = 5, page: number = 1, searchText: string = ''): Promise<{ count: number; chatInfos: ChatInfo[] }> {

        const matchStage: any = { userId: new ObjectId(userId) };

        if (searchText && searchText.trim().length > 0) {
            matchStage.title = { $regex: searchText.trim(), $options: 'i' };
        }

        const pipeline = [
            { $match: matchStage },
            {
                $facet: {
                    chats: [
                        { $sort: { lastModificationDate: -1 } },
                        { $skip: (page - 1) * pageSize },
                        { $limit: pageSize },
                        {
                            $project: {
                                _id: 1,
                                userId: 1,
                                title: 1,
                                creationDate: 1,
                                lastModificationDate: 1,
                                messageCount: { $size: "$messages" }
                            }
                        }
                    ],
                    counts: [
                        { $count: "total" }
                    ]
                }
            }
        ];

        const result = await this.collection.aggregate(pipeline).toArray();

        const chatInfos = result[0]?.chats ?? [];
        const count = result[0]?.counts[0]?.total ?? 0;

        return { count, chatInfos };
    }

    async deleteFromCache(chatId: string): Promise<void> {
        if (!chatId) {
            throw new Error("chatId requis pour supprimer du cache");
        }

        const key = `chat:${chatId}`;
        await valkey.del(key);
    }

    async delete(chatId: string): Promise<boolean> {
        const id = new ObjectId(chatId);

        const chatExists = await this.collection.findOne({ _id: id });
        if (!chatExists) {
            throw new Error(`chatId invalide : ${chatId}`);
        }

        const result = await this.collection.deleteOne({ _id: id });
        await this.deleteFromCache(chatId);
        return result.deletedCount === 1;
    }
}

export const chatRepository = new ChatRepository();