export function AvatarEdit({ userId }: { userId: string }): JSX.Element {
    return (
        <form
            hx-post={`/user/updateAvatar`}
            hx-target="#avatar-display"
            hx-swap="innerHTML"
            class="avatar-edit-form"
            enctype="multipart/form-data"
        >
            <input type="file" name="avatar" accept="image/*" required />
            <button type="submit" class="email-edit-submit">Envoyer</button>
            <button
                type="button"
                hx-get="/user/displayAvatar"
                hx-target="#avatar-display"
                hx-swap="innerHTML"
                class="email-edit-cancel"
            >
                Annuler
            </button>
        </form>
    );
}
