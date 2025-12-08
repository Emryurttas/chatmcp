import { PropsWithChildren } from "@kitajs/html";

export function ChatTitleDisplay(
    props: PropsWithChildren<{ title: string; chatId: string }>
): JSX.Element {
    return (
        <div class="navbar-title">
            <span>{props.title}</span>

            <a href={`/chat/edit/${props.chatId}`}>
                <i class="fas fa-edit"></i>
            </a>
        </div>
    );
}
