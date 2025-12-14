import { PropsWithChildren } from "@kitajs/html";
import { User } from "../../user/user";
import { ChatInfo } from "../chat";
import { NavBar } from "../../views/navbar";
import { ChatTitleDisplay } from "./chat-title";

function ChatListItem(chat: ChatInfo): JSX.Element {
    const chatIdStr = chat._id?.toString() || '';

    return (
        <li class="chat-item" data-id={chatIdStr}>
            <div class="chat-header">
                <div id={`chat-title-${chatIdStr}`}>
                    <ChatTitleDisplay title={chat.title} chatId={chatIdStr} />
                </div>
                <a href={`/chat/${chatIdStr}`} title="Accéder à la conversation" class="chat-access-btn">
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>

            <div class="chat-dates">
                <div>Créée le : {chat.creationDate.toLocaleString()}</div>
                <div>Modifiée le : {chat.lastModificationDate.toLocaleString()}</div>
            </div>

            <div class="chat-footer">
                <span>{chat.messageCount ?? 0} messages</span>
                <form method="POST" action={`/chat/delete/${chat._id}`}>
                    <button type="submit" title="Supprimer" class="btn-trash">
                        <i class="fas fa-trash"></i>
                    </button>
                </form>
            </div>
        </li>
    );
}

export function ChatListPage(props: PropsWithChildren<{ user: User; chatInfos: ChatInfo[] }>): JSX.Element {
    const { user, chatInfos } = props;

    return (
        <>
            {'<!DOCTYPE html>'}
            <html lang="fr" data-theme="dark">
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <title>Liste des conversations</title>
                    <link rel="stylesheet" href="/css/pico.min.css" />
                    <link rel="stylesheet" href="/css/chat.css" />
                    <link rel="icon" href="/images/bot.png" />
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet"/>
                    <script src="https://unpkg.com/htmx.org@1.9.4/dist/htmx.min.js"></script>
                </head>
                <body>
                    {NavBar({ user })}
                    <main>
                        <ul class="chat-list">
                            {chatInfos.map(chat => ChatListItem(chat))}
                        </ul>
                    </main>
                </body>
            </html>
        </>
    );
}
