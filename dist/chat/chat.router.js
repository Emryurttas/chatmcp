"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = require("./chat.controller");
const router = (0, express_1.Router)();
router.get('/chat', chat_controller_1.chatController.chat.bind(chat_controller_1.chatController));
router.post('/chat/send/:id', chat_controller_1.chatController.sendPrompt.bind(chat_controller_1.chatController));
exports.default = router;
//# sourceMappingURL=chat.router.js.map