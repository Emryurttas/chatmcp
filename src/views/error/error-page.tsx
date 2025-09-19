export function ErrorPageView(props: { message: string }): JSX.Element {
    return (
        <>
            {'<!DOCTYPE html>'}
            <html lang="fr">
                <head>
                    <meta charset="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                    <link rel="stylesheet" href="/css/pico.min.css" />
                    <link rel="icon" href="/images/bot.png" />
                    <script src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/htmx.js"></script>
                    <title>Erreur</title>
                </head>
                <body>
                    <h1>Une erreur est survenue</h1>
                    <p>{props.message}</p>
                    <a href="/">Retour à l'accueil</a>
                </body>
            </html>
        </>
    );
}