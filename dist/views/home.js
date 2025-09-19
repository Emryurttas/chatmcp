"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeView = HomeView;
const jsx_runtime_1 = require("@kitajs/html/jsx-runtime");
function HomeView(props) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ['<!DOCTYPE html>', (0, jsx_runtime_1.jsxs)("html", { lang: "fr", children: [(0, jsx_runtime_1.jsxs)("head", { children: [(0, jsx_runtime_1.jsx)("meta", { charset: "utf-8" }), (0, jsx_runtime_1.jsx)("meta", { name: "viewport", content: "width=device-width, initial-scale=1, shrink-to-fit=no" }), (0, jsx_runtime_1.jsx)("title", { children: props.title }), (0, jsx_runtime_1.jsx)("link", { rel: "stylesheet", href: "/css/pico.min.css" }), (0, jsx_runtime_1.jsx)("link", { rel: "icon", href: "/images/bot.png" }), (0, jsx_runtime_1.jsx)("script", { src: "https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/htmx.js" })] }), (0, jsx_runtime_1.jsxs)("body", { children: [(0, jsx_runtime_1.jsx)("h1", { children: props.title }), (0, jsx_runtime_1.jsx)("a", { href: "/chat", children: "Chatbot" })] })] })] }));
}
//# sourceMappingURL=home.js.map