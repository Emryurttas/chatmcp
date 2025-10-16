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
                hx-on--before-request="this.setAttribute('aria-busy', 'true')"
                hx-on--after-request="this.removeAttribute('aria-busy')"
                hx-on--error="this.removeAttribute('aria-busy')"
            ></div>
        </article>
    );
}
