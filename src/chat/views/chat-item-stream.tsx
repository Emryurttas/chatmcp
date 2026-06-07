export interface ChatItemProps {
    prompt: string;
    id: string;
}

export function ChatItemStreamView({ prompt, id }: ChatItemProps) {
    return (
        <article class="chat-item">
            <p>{prompt}</p>
            <div
                id={`stream-${id}`}
                hx-ext="sse"
                sse-connect={`/chat/stream/${id}`}
                sse-swap="token"
                sse-close="close"
                hx-swap="beforeend"
                hx-on--sse-close={`
                    const el = document.getElementById('stream-${id}');
                    const raw = el.innerText;
                    el.outerHTML = '<tag of=\\"render-markdown\\"><script type=\\"text/markdown\\">' + raw + '<\/script><\/tag>';
                `}
            ></div>
        </article>
    );
}