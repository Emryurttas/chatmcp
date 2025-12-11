import { Request, Response, NextFunction } from "express";
import { chatRepository } from "./chat.repository";
import { idAsString } from "../utils/id-as-string";

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

    const chatUserId = idAsString(chat.userId);
    const sessionUserId = idAsString(user._id);

    if (chatUserId !== sessionUserId) {
        return res.status(403).send("Vous n'êtes pas autorisé à accéder à cette conversation.");
    }

    next();
}
