import { mongodb } from "../services/mongo";
import { User } from "./user";

class UserRepository {
    private readonly collection = mongodb.collection<User>('users');

    async findAll(): Promise<User[]> {
        return this.collection.find().toArray();
    }
}

export const userRepository = new UserRepository;