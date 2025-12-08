interface EmailEditProps {
    email: string;
}

export function EmailEdit({ email }: EmailEditProps): JSX.Element {
    return (
        <form
            hx-post="/user/updateEmail"
            hx-target="#email-display"
            hx-swap="innerHTML"
            class="email-edit-form"
        >
            <label for="email" class="email-edit-label">
                Adresse email :
            </label>

            <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                class="email-edit-input"
            />

            <button type="submit" class="email-edit-submit">
                Envoyer
            </button>

            <button
                type="button"
                hx-get="/user/displayEmail"
                hx-target="#email-display"
                hx-swap="innerHTML"
                class="email-edit-cancel"
            >
                Annuler
            </button>
        </form>
    );
}
