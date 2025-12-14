import { PropsWithChildren } from "@kitajs/html";
import { User } from "../user";
import { NavBar } from "../../views/navbar";

export function ProfilePage(props: PropsWithChildren<{ user: User }>): JSX.Element {
    const { user } = props;

    return (
        <html lang="fr">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <link rel="stylesheet" href="/css/pico.min.css" />
                <link rel="stylesheet" href="/css/user.css" />
                <link rel="icon" href="/images/bot.png" />
                <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/fontawesome.min.css" rel="stylesheet" type="text/css" />
                <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/solid.min.css" rel="stylesheet" type="text/css" />
                <script src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/htmx.js"></script>
            </head>
            <body>
                <NavBar user={user}></NavBar>
                <main>
                    <div>
                        <strong>Nom d'utilisateur :</strong>
                        <ul>
                            <li>{user.userName}</li>
                        </ul>
                        <strong>Courriel :</strong>
                        <div id="email-display">
                            <EmailDisplay email={user.email} />
                        </div>
                    </div>
                </main>
            </body>
        </html>
    );
} 


export function EmailDisplay({ email, message }: { email: string; message?: string }): JSX.Element {
    return (
        <div>
            {email}
            {message && (
                <div style={{ color: "red", fontSize: "0.9rem", marginTop: "0.3rem" }}>
                    {message}
                </div>
            )}
            <i
                class="fas fa-edit"
                style={{ cursor: 'pointer', color: '#22d54fff', marginLeft: "0.5rem" }}
                hx-get="/user/editEmail"
                hx-target="#email-display"
                hx-swap="innerHTML"
            ></i>
        </div>
    );
}