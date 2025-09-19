"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatController = exports.ChatController = void 0;
class ChatController {
    chat(req, res) {
        const now = new Date();
        const heure = now.toLocaleTimeString('fr-FR');
        res.send(`Bonjour. Il est ${heure}.`);
    }
}
exports.ChatController = ChatController;
exports.chatController = new ChatController();
//# sourceMappingURL=chat.controller.js.map