import { NavBar } from "../../views/navbar";

export function loginForm(): JSX.Element {
    return (
        <>
            {'<!DOCTYPE html>'}
            <html lang="fr">
                <head>
                    <meta charset="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <link rel="stylesheet" href="/css/pico.min.css" />
                    <link rel="icon" href="/images/bot.png" />
                    <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/fontawesome.min.css" rel="stylesheet" type="text/css" />
                    <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/solid.min.css" rel="stylesheet" type="text/css" />
                    <script src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/htmx.js"></script>
                </head>
                <body>
                    <NavBar />

                    <main style={{ padding: '1rem' }}>
                        <h1>Connexion</h1>
                        <form method="POST" action="/user/login">
                            <div>
                                <label for="userName">Nom d'utilisateur :</label>
                                <input type="text" id="userName" name="userName" required />
                            </div>
                            <div>
                                <label for="password">Mot de passe :</label>
                                <input type="password" id="password" name="password" required />
                            </div>
                            <button type="submit">Se connecter</button>
                        </form>
                    </main>
                </body>
            </html>
        </>
    );
}