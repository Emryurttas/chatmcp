import { PropsWithChildren } from "@kitajs/html";

export function ChatDropdown(props: PropsWithChildren<{ user?: { userName: string } }>): JSX.Element {
    if (!props.user) {
        return <></>;
    }

    return (
        <details class="dropdown" style={{ display: 'inline-block', position: 'relative' }}>
            <summary>
                <i class="fa-solid fa-comment"></i> Conversations
            </summary>

            <ul class="chat-dropdown-menu">
                <li>
                    <a href="/chat/list" class="chat-dropdown-item">
                        Liste des conversations
                    </a>
                </li>

                <li>
                    <a href="/chat/new" class="chat-dropdown-item">
                        Nouvelle conversation
                    </a>
                </li>

                <li>
                    <a href="/discuss" class="chat-dropdown-item">
                        Discussion
                    </a>
                </li>
                
            </ul>
        </details>
    );
}
