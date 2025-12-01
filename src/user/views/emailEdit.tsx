interface EmailEditProps {
    email: string;
}

export function EmailEdit({ email }: EmailEditProps): JSX.Element {
    return (
        <div
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                width: "100%",
            }}
        >
            <label
                style={{
                    minWidth: "160px",
                    fontWeight: "bold",
                    fontSize: "1rem",
                }}
            >
                Adresse email :
            </label>

            <input
                type="email"
                id="email"
                name="email"
                required
                style={{
                    maxWidth: "600px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                }}
            />

            <button
                type="submit"
                style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "0.6rem 0.8rem",
                    cursor: "pointer",
                    width: "auto",
                }}
            >
                Envoyer
            </button>

            <button
                type="button"
                style={{
                    backgroundColor: "#ccc",
                    border: "none",
                    padding: "0.6rem 0.8rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                }}
            >
                Annuler
            </button>
        </div>
    );
}
