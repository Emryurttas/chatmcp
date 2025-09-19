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
                    <script src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/htmx.js"></script>
                </head>
                <body>
                    <div id="chat">
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