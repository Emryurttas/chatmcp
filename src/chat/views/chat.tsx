export function ChatView(props: { conversationId: string }): JSX.Element {
    return (
        <>
            {'<!DOCTYPE html>'}
            <html lang="fr">
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <title>Chatbot</title>

                    <link rel="stylesheet" href="/css/chat.css" />
                    <link rel="stylesheet" href="/css/pico.min.css" />
                    <link rel="icon" href="/images/bot.png" />
                    <link rel="stylesheet" href="/css/error-dialog.css" />

                    <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/katex.min.css" rel="stylesheet"/>
                    <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/default-dark.css"
                          media="(prefers-color-scheme: dark)" rel="stylesheet"/>
                    <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/default-light.css"
                          media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)" rel="stylesheet"/>
                    <script src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/render-markdown.js" type="module"></script>

                    <script src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/htmx.js"></script>
                </head>
                <body>
                    <div id="chat" hx-ext="render-markdown" hx-swap="beforeend">
                        <p>Bienvenue sur ChatMCP</p>
                    </div>

                    <form>
                        <input type="text" id="prompt" name="prompt" placeholder="Votre message..." required />
                        <button
                            type="submit"
                            id="send"
                            hx-post={`/chat/send/${props.conversationId}`}
                            hx-target="#chat"
                            hx-swap="beforeend">
                            Envoyer
                        </button>
                    </form>

                    <div id="conversation-id">
                        ID: {props.conversationId}
                    </div>
                </body>
            </html>
        </>
    )
}