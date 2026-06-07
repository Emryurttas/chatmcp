import { mongodb } from "../services/mongo";
import { User } from "./user";
import { ObjectId } from "bson";

class UserRepository {
    private readonly collection = mongodb.collection<User>('users');

    constructor() {
        this.collection.createIndex(
            { userName: 1 },
            { unique: true }
        )
    }

    async findAll(): Promise<User[]> {
        return this.collection.find().toArray();
    }

    async findByUserName(userName: string): Promise<User | null> {
        return this.collection.findOne({ userName });
    }

    async findById(id: string | ObjectId): Promise<User | null> {
        const _id = typeof id === "string" ? new ObjectId(id) : id;
        return this.collection.findOne({ _id });
    }

    async updateEmail(id: string | ObjectId, email: string): Promise<void> {
        const _id = typeof id === "string" ? new ObjectId(id) : id;
        await this.collection.updateOne(
            { _id },
            { $set: { email } }
        );
    }

    async updateAvatar(id: string | ObjectId, avatarBase64: string): Promise<void> {
        const _id = typeof id === "string" ? new ObjectId(id) : id;
        await this.collection.updateOne(
            { _id },
            { $set: { avatar: avatarBase64 } }
        );
    }

    async getAvatar(id: string | ObjectId): Promise<string | null> {
        const _id = typeof id === "string" ? new ObjectId(id) : id;
        const user = await this.collection.findOne({ _id }, { projection: { avatar: 1 } });
        return user?.avatar ?? null;
    }
}

export const userRepository = new UserRepository();