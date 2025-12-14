import { ModelMessage } from 'ai';
import { User } from '../../user/user';
import { NavBar } from '../../views/navbar';
import { MessageItem, MessageItems } from '../../chat/views/chat';

export function discussPageView(props: { conversationId: string; user: User; messages?: ModelMessage[] }) {
    const displayUser = props.user?.userName ? props.user : { userName: 'Invité' };

    return (
        <>
            {'<!DOCTYPE html>'}
            <html lang="fr">
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <title>Discussion - ChatMCP</title>
                    <link rel="stylesheet" href="/css/pico.min.css" />
                    <link rel="stylesheet" href="/css/chat.css" />
                    <link rel="icon" href="/images/bot.png" />
                    <link rel="stylesheet" href="/css/error-dialog.css" />
                    <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/katex.min.css" rel="stylesheet"/>
                    <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/default-dark.css" media="(prefers-color-scheme: dark)" rel="stylesheet"/>
                    <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/default-light.css" media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)" rel="stylesheet"/>
                    <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/solid.min.css" rel="stylesheet" type="text/css" />
                    <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/fontawesome.min.css" rel="stylesheet" type="text/css" />
                    <script src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/render-markdown.js" type="module"></script>
                    <script src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/htmx.js"></script>
                    <script src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/sse.js"></script>
                    <script src="/socket.io/socket.io.js"></script>
                </head>
                <body>
                    {NavBar({ user: displayUser, chatTitle: "Discussion", chatId: props.conversationId })}

                    <div id="chat" hx-ext="render-markdown" hx-swap="beforeend">
                        {props.messages && <MessageItems messages={props.messages} />}
                    </div>

                    <form
                        hx-post={`/discuss/send/${props.conversationId}`}
                        hx-target="#chat"
                        hx-swap="beforeend"
                    >
                        <textarea id="prompt" name="prompt" placeholder="Votre message..." required></textarea>
                        <button type="submit" id="send">Envoyer</button>
                    </form>

                    <script type="module" src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/autosize-textarea.js"></script>

                    <div id="conversation-id" style={{ display: 'none' }}>
                        {props.conversationId}
                    </div>
                </body>
            </html>
        </>
    );
}
