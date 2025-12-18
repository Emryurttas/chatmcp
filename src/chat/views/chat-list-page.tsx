import { User } from "../../user/user";
import { ChatInfo } from "../chat";
import { NavBar } from "../../views/navbar";
import { ChatList } from "./chat-list";

export function ChatListPage(props: { user: User; chatInfos: ChatInfo[]; page: number; pageSize: number; totalCount: number; searchText?: string }): JSX.Element {
    const { user, chatInfos, page, pageSize, totalCount, searchText = '' } = props;

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
                    <link rel="stylesheet" href="/css/user.css" />
                    <link rel="icon" href="/images/bot.png" />
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet"/>
                    <script src="https://unpkg.com/htmx.org@1.9.4/dist/htmx.min.js"></script>
                </head>
                <body>
                    <NavBar user={user} chatCount={totalCount} />
                    <main>
                        <ChatList
                            user={user}
                            chatInfos={chatInfos}
                            page={page}
                            pageSize={pageSize}
                            totalCount={totalCount}
                            searchText={searchText}
                        />
                    </main>
                </body>
            </html>
        </>
    );
}
