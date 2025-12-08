export function ErrorDialogView(props: { message: string }) {
    return (
        <dialog open class="error-modal">
            <div class="error-modal-content">
                <div class="error-modal-header">
                    <span class="error-modal-icon">😎</span>
                    <h3 class="error-modal-title">Erreur</h3>
                </div>
                <p class="error-modal-message">{props.message}</p>
                <div class="error-modal-footer">
                    <button
                        class="error-modal-close-button"
                        onclick="this.closest('dialog').remove()"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </dialog>
    );
}
