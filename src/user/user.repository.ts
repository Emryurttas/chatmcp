import { mongodb } from "../services/mongo";
import { User } from "./user";

class UserRepository {
    private readonly collection = mongodb.collection<User>('users');

    async findAll(): Promise<User[]> {
        return this.collection.find().toArray();
    }
    async findByUserName(userName: string){
        return this.collection.findOne({userName})
    }
}

export const userRepository = new UserRepository;