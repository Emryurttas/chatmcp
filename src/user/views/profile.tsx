import { PropsWithChildren } from "@kitajs/html";
import { User } from "../user";
import { NavBar } from "../../views/navbar";
import { idAsString } from "../../utils/id-as-string";

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
                <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/fontawesome.min.css" rel="stylesheet" />
                <link href="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/css/solid.min.css" rel="stylesheet" />
                <script src="https://iut-info.univ-reims.fr/users/nourrit/chatmcp/js/htmx.js"></script>
            </head>
            <body>
                <NavBar user={user}>
                    Édition du profil
                </NavBar>
                <main>
                    <div>
                        <strong>Nom d'utilisateur :</strong>
                        <ul>
                            <li>{user.userName}</li>
                        </ul>

                        <strong>Avatar :</strong>
                        <div id="avatar-display" style={{ marginBottom: "1em" }}>
                            <AvatarDisplay userId={idAsString(user._id)} />
                        </div>

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
export function AvatarDisplay({ userId }: { userId: string }): JSX.Element {
    return (
        <div>
            <img 
                src={`/user/${userId}/avatar`} 
                alt="Avatar utilisateur" 
                width={100} 
                height={100} 
                style={{ borderRadius: "50%", display: "block", marginBottom: "0.5em" }} 
            />
            <i
                class="fas fa-edit"
                style={{ cursor: 'pointer', color: '#22d54fff', marginLeft: "0.5rem" }}
                hx-get={`/user/editAvatar`}
                hx-target="#avatar-display"
                hx-swap="innerHTML"
            ></i>
        </div>
    );
}
