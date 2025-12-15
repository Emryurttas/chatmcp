import { ModelMessage } from 'ai';
import { User } from '../../user/user';
import { NavBar } from '../../views/navbar';

export function MessageItem({ message }: { message: ModelMessage }): JSX.Element {
    let content: string;
    if (typeof message.content === 'string') {
        content = message.content;
    } else {
        content = message.content.map(() => null).join('');
    }

    if (message.role === 'user') {
        return <article class="user-message">{content}</article>;
    } else {
        return (
            <tag of="render-markdown">
                <script type="text/markdown">{content}</script>
            </tag>
        );
    }
}

export function MessageItems(props: { messages: ModelMessage[] }): JSX.Element {
    return <>{props.messages.map(m => <MessageItem message={m} />)}</>;
}

export function ChatView(props: { conversationId: string; messages?: ModelMessage[]; chatTitle?: string; user?: User; }): JSX.Element {
    const displayUser = props.user?.userName ? props.user : { userName: 'Invité' };

    return (
        <>
            {'<!DOCTYPE html>'}
            <html lang="fr">
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <title>Chatbot</title>

                    <link rel="stylesheet" href="/css/pico.min.css" />
                    <link rel="stylesheet" href="/css/chat.css" />
                    <link rel="icon" href="/images/bot.png" />
                    <link rel="stylesheet" href="/css/error-dialog.css" />

                    <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/katex.min.css" rel="stylesheet"/>
                    <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/default-dark.css"
                          media="(prefers-color-scheme: dark)" rel="stylesheet"/>
                    <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/default-light.css"
                          media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)" rel="stylesheet"/>
                    <script src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/render-markdown.js" type="module"></script>
                    <script src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/htmx.js"></script>
                    <script src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/sse.js"></script>
                    <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/solid.min.css" rel="stylesheet" type="text/css" />
                    <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/fontawesome.min.css" rel="stylesheet" type="text/css" />
                </head>
                <body>
                    {NavBar({ 
                        user: displayUser, 
                        chatTitle: props.chatTitle, 
                        chatId: props.conversationId 
                    })}

                    <div id="chat" hx-ext="render-markdown" hx-swap="beforeend">
                        <tag of="render-markdown">
                            <script type="text/markdown">
                                # Bienvenue sur ChatMCP
                            </script>
                            <script type="text/markdown">
                                Commencez dès maintenant à interagir avec le chatbot! Chaque réponse sera affichée au format Markdown ici.
                            </script>
                        </tag>
                        {props.messages && <MessageItems messages={props.messages} />}
                    </div>

                    <form
                        hx-post={`/chat/send/${props.conversationId}`}
                        hx-target="#chat"
                        hx-swap="beforeend"
                    >
                        <textarea
                            id="prompt"
                            name="prompt"
                            placeholder="Votre message..."
                            required
                        ></textarea>

                        <p>
                            <label>
                                <input type="checkbox" name="streamingMode" />
                                Mode streaming
                            </label>
                        </p>

                        <button type="submit" id="send">Envoyer</button>
                    </form>

                    <script type="module" src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/autosize-textarea.js"></script>

                    <div id="conversation-id">
                        ID: {props.conversationId}
                    </div>
                </body>
            </html>
        </>
    );
}
