import { PropsWithChildren } from "@kitajs/html";
import { User } from "../../user/user";
import { ChatInfo } from "../chat";
import { NavBar } from "../../views/navbar";
import { ChatTitleDisplay } from "./chat-title";

function ChatItem(chat: ChatInfo): JSX.Element {
    return (
        <li data-id={chat._id?.toString()}>
            <ChatTitleDisplay title={chat.title} chatId={chat._id?.toString() || ''} />
            <span>
                - Dernière modification : {chat.lastModificationDate.toLocaleString()} 
                - Messages : {chat.messageCount ?? 0}
            </span>
        </li>
    );
}

export function ChatListPage(props: PropsWithChildren<{ user: User, chatInfos: ChatInfo[] }>): JSX.Element {
    const { user, chatInfos } = props;

    return (
        <>
            {'<!DOCTYPE html>'}
            <html lang="fr">
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <title>Liste des conversations</title>
                    <link rel="stylesheet" href="/css/pico.min.css" />
                    <link rel="stylesheet" href="/css/chat.css" />
                    <link rel="icon" href="/images/bot.png" />
                </head>
                <body>
                    {NavBar({ user, conversationCount: chatInfos.length })}

                    <main style={{ padding: '1em 3%' }}>
                        <h1>Conversations de {user.userName}</h1>
                        <ul>
                            {chatInfos.map(chat => ChatItem(chat))}
                        </ul>
                    </main>
                </body>
            </html>
        </>
    );
}

