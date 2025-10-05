export function ErrorDialogView(props: { message: string }) {
    return (
        <dialog open className="error-modal">
            <div className="error-modal-content">
                <div className="error-modal-header">
                    <span className="error-modal-icon">😎</span>
                    <h3 className="error-modal-title">Erreur</h3>
                </div>
                <p className="error-modal-message">{props.message}</p>
                <div className="error-modal-footer">
                    <button
                        className="error-modal-close-button"
                        onclick="this.closest('dialog').remove()"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </dialog>
    );
}
