"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatController = exports.ChatController = void 0;
const chat_model_1 = require("./chat.model");
const chat_1 = require("./views/chat");
class ChatController {
    chat(req, res) {
        const chatInstance = new chat_model_1.ChatModel();
        const conversationId = chatInstance.chatId;
        const page = (0, chat_1.ChatView)({ conversationId });
        res.send(page);
    }
    sendPrompt(req, res) {
        res.send('<p>coucou</p>');
    }
}
exports.ChatController = ChatController;
exports.chatController = new ChatController();
//# sourceMappingURL=chat.controller.js.map