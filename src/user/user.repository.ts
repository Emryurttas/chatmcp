import { mongodb } from "../services/mongo";
import { User } from "./user";
import { ObjectId } from "bson";

class UserRepository {
    private readonly collection = mongodb.collection<User>('users');

    async findAll(): Promise<User[]> {
        return this.collection.find().toArray();
    }

    async findByUserName(userName: string): Promise<User | null> {
        return this.collection.findOne({ userName });
    }

    async updateEmail(id: string | ObjectId, email: string): Promise<void> {
        const _id = typeof id === "string" ? new ObjectId(id) : id;
        await this.collection.updateOne(
            { _id },
            { $set: { email } }
        );
    }
}

export const userRepository = new UserRepository();
