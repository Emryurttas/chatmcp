export function TitleEdit({ title, chatId }: { title: string; chatId: string }): JSX.Element {
    return (
        <form
            hx-post={`/chat/updateTitle/${chatId}`}
            hx-target="#title-display"
            hx-swap="innerHTML"
            class="title-edit-form"
        >
            <input
                type="text"
                id="title"
                name="title"
                required
                value={title}
                class="title-edit-input"
            />

            <button type="submit" class="title-edit-submit">
                Envoyer
            </button>

            <button
                type="button"
                hx-get={`/chat/displayTitle/${chatId}`}
                hx-target="#title-display"
                hx-swap="innerHTML"
                class="title-edit-cancel"
            >
                Annuler
            </button>
        </form>
    );
}
