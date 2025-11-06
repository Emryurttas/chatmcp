export function loginForm(): JSX.Element {
    return (
        <>
            {'<!DOCTYPE html>'}
            <html lang="fr">
                <body>
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
                </body>
            </html>
        </>
    );
}