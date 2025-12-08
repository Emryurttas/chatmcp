import { Request, Response, NextFunction } from "express";
import { chatRepository } from "./chat.repository";
import { ObjectId } from "bson";

export async function isChatOwner(req: Request, res: Response, next: NextFunction) {
    const user = req.session?.user;
    if (!user || !user._id) {
        return res.status(401).send("Utilisateur non authentifié.");
    }

    const chatId = req.params.id;
    if (!chatId) {
        return res.status(400).send("Identifiant de conversation manquant.");
    }

    const chat = await chatRepository.find(chatId);

    const userObjectId = user._id instanceof ObjectId ? user._id : new ObjectId(user._id);

    if (!chat.userId.equals(userObjectId)) {
        return res.status(403).send("Vous n'êtes pas autorisé à accéder à cette conversation.");
    }

    next();
}
