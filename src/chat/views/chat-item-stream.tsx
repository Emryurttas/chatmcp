export interface ChatItemProps {
    prompt: string;
    id: string;
}

export function ChatItemStreamView({ prompt, id }: ChatItemProps) {
    return (
        <article class="chat-item">
            <p>{prompt}</p>
            <tag of="render-markdown-stream">
                <div
                    hx-ext="sse"
                    sse-connect={`/chat/stream/${id}`}
                    sse-swap="token"
                    sse-close="close"
                    hx-swap="innerHTML"
                ></div>
            </tag>
        </article>
    );
}