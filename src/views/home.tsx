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
                    <script src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/htmx.js"></script>
                </head>
                <body>
                    <NavBar user={props.user} />

                    <main style={{ padding: '1rem' }}>

                        {props.user ? (
                            <p>
                                <a href="/user/logout">Se déconnecter</a>
                            </p>
                        ) : (
                            <p>
                                <a href="/user/login">Se connecter</a>
                            </p>
                        )}

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
