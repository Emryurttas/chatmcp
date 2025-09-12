"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = void 0;
const google_1 = require("@ai-sdk/google");
const ai_1 = require("ai");
const chat_repository_1 = require("./chat.repository");
const MODEL_NAME = (0, google_1.google)('gemini-2.0-flash');
class ChatModel {
    _chatId;
    static repository = new chat_repository_1.ChatRepository();
    constructor() {
        this._chatId = ChatModel.repository.create([]);
    }
    async send(prompt) {
        ChatModel.repository.addMessages(this._chatId, [{ role: 'user', content: prompt }]);
        const { text } = await (0, ai_1.generateText)({
            model: MODEL_NAME,
            prompt: prompt
        });
        ChatModel.repository.addMessages(this._chatId, [{ role: 'bot', content: text }]);
        return text;
    }
    get chatId() {
        return this._chatId;
    }
}
exports.ChatModel = ChatModel;
//# sourceMappingURL=chat.model.js.map