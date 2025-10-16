export interface ChatItemProps {
    prompt: string;
    id: string;
}

export function ChatItemView({ prompt, id }: ChatItemProps) {
    return (
        <article className="chat-item">
            <p>{prompt}</p>
            <div
                aria-busy="true"
                hx-get={`/chat/query/${id}`}
                hx-trigger="load"
                hx-target="this"
                hx-swap="innerHTML"
                hx-on="afterSwap: this.removeAttribute('aria-busy')"
            ></div>
        </article>
    );
}
