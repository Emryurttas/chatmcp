import { ObjectId } from "bson";

interface User {
    _id?: ObjectId;
    hashedPassword: string;
    userName: string;
    email: string;
    avatar?: string;
}
declare module "express-session" {
    interface SessionData {
        user: User;
    }
}