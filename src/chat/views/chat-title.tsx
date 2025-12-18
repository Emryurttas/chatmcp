import { PropsWithChildren } from "@kitajs/html";

export function ChatTitleDisplay(props: PropsWithChildren<{ title: string; chatId: string }>): JSX.Element {
    return (
        <div id={`title-display-${props.chatId}`} class="chat-title-display">
            <span>{props.title}</span>
            <i
                class="fas fa-edit"
                hx-get={`/chat/editTitle/${props.chatId}`}
                hx-target={`#title-display-${props.chatId}`}
                hx-swap="innerHTML"
            ></i>
        </div>
    );
}
