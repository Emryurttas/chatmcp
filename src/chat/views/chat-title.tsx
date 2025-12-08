import { PropsWithChildren } from "@kitajs/html";

export function ChatTitleDisplay(props: PropsWithChildren<{ title: string; chatId: string }>): JSX.Element {
    return (
        <div style={{ display: 'flex', gap: '0.5em', position: "absolute", left:"40%"}}>
            <span>{props.title}</span>
            <a href={`/chat/edit/${props.chatId}`} style={{ color: 'white', textDecoration: 'none' }}>
                <i class="fas fa-edit"></i>
            </a>
        </div>
    );
}
