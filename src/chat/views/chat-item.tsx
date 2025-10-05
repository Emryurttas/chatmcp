export interface ChatItemProps {
    prompt: string;
}

export function ChatItemView({ prompt }: ChatItemProps) {
    return (
        <article className="chat-item">
            <p>{prompt}</p>
            <div>coucou</div>
        </article>
    );
}