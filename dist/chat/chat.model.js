"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = void 0;
const google_1 = require("@ai-sdk/google");
const ai_1 = require("ai");
const MODEL_NAME = (0, google_1.google)('gemini-2.0-flash');
class ChatModel {
    async send(prompt) {
        const { text } = await (0, ai_1.generateText)({
            model: MODEL_NAME,
            prompt: prompt
        });
        return text;
    }
}
exports.ChatModel = ChatModel;
//# sourceMappingURL=chat.model.js.map