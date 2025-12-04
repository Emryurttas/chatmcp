interface EmailEditProps {
    email: string;
}

export function EmailEdit({ email }: EmailEditProps): JSX.Element {
    return (
        <form
            hx-post="/user/updateEmail"
            hx-target="#email-display"
            hx-swap="innerHTML"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", width: "100%" }}
        >
            <label
                for="email"
                style={{ minWidth: "120px", fontWeight: "bold" }}
            >
                Adresse email :
            </label>

            <input
                type="email"
                id="email"
                name="email"
                required
                value={email}  // input non contrôlé
                style={{ maxWidth: "600px", border: "1px solid #ccc", borderRadius: "4px" }}
            />

            <button
                type="submit"
                style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "0.4rem 0.5rem",
                    cursor: "pointer",
                    maxWidth: "120px",
                    width: "100%"
                }}
            >
                Envoyer
            </button>

            <button
                type="button"
                hx-get="/user/displayEmail"
                hx-target="#email-display"
                hx-swap="innerHTML"
                style={{
                    backgroundColor: "#ccc",
                    border: "none",
                    padding: "0.4rem 0.5rem",
                    cursor: "pointer",
                    maxWidth: "120px",
                    width: "100%"
                }}
            >
                Annuler
            </button>
        </form>
    );
}

