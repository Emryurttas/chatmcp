export interface ChatItemProps {
    prompt: string;
    id: string;
}

export function ChatItemStreamView({ prompt, id }: ChatItemProps) {
    return (
        <article class="chat-item">
            <p>{prompt}</p>
            <div
                hx-ext="sse,render-markdown-stream"
                sse-connect={`/chat/stream/${id}`}
                sse-swap="token"
                sse-close="close"
                hx-swap="beforeend"
            ></div>
        </article>
    );
}