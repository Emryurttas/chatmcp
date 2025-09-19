export function ChatView(props: { conversationId: string }): JSX.Element {
    return (
        <>
            {'<!DOCTYPE html>'}
            <html lang="fr">
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <title>Chatbot</title>
                    <link rel="stylesheet" href="/css/pico.min.css" />
                    <link rel="icon" href="/images/bot.png" />
                    <script src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/htmx.js"></script>
                </head>
                <body>
                    <div id="chat-box">
                        <p>Bienvenue dans la conversation {props.conversationId}</p>
                    </div>
                    <form 
                        hx-post={`/chat/message/${props.conversationId}`} 
                        hx-target="#chat-box" 
                        hx-swap="beforeend"
                        hx-trigger="submit"
                    >
                        <input type="text" name="message" placeholder="Votre message..." required />
                        <button type="submit">Envoyer</button>
                    </form>
                </body>
            </html>
        </>
    )
}