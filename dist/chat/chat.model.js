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
    get chatId() {
        return this._chatId;
    }
    addPrompt(prompt) {
        ChatModel.repository.addMessages(this._chatId, [{ role: 'user', content: prompt }]);
    }
    createGenerationConfig() {
        const messages = ChatModel.repository.find(this._chatId);
        return {
            model: MODEL_NAME,
            messages,
        };
    }
    async fetchAnswer() {
        const config = this.createGenerationConfig();
        const { text, response } = await (0, ai_1.generateText)(config);
        if (response.messages) {
            ChatModel.repository.addMessages(this._chatId, [{ role: 'user', content: text },]);
        }
        return text;
    }
    async *fetchAnswerStream() {
        const config = this.createGenerationConfig();
        const result = await (0, ai_1.streamText)(config);
        let accumulated = "";
        for await (const textPart of result.textStream) {
            accumulated += textPart;
            yield textPart;
        }
        ChatModel.repository.addMessages(this._chatId, [
            { role: 'user', content: accumulated },
        ]);
    }
}
exports.ChatModel = ChatModel;
//# sourceMappingURL=chat.model.js.map