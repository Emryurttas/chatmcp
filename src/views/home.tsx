import { NavBar } from "./navbar";

export function HomeView(props: { title: string; user?: { userName: string } }): JSX.Element {
    return (
        <>
            {'<!DOCTYPE html>'}
            <html lang="fr">
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <title>{props.title}</title>
                    <link rel="stylesheet" href="/css/pico.min.css" />
                    <link rel="icon" href="/images/bot.png" />
                    <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/fontawesome.min.css" rel="stylesheet" type="text/css" />
                    <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/solid.min.css" rel="stylesheet" type="text/css" />
                    <script src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/htmx.js"></script>
                </head>
                <body>
                    <NavBar user={props.user} />

                    <main>
                        <a href="/chat">Chatbot</a>

                        <button 
                            id="heure-btn"
                            hx-get="/time"
                            hx-target="#heure-btn"
                            hx-swap="outerHTML">
                            Heure
                        </button>
                    </main>
                </body>
            </html>
        </>
    );
}
