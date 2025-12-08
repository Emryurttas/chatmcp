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
            <ul style={{
                position: 'absolute',
                top: '100%',
                left: '60%',
                transform: 'translateX(-50%)',
                backgroundColor: '#2c3e50',
                color: 'white',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                padding: '0.5em 0',
                margin: 0,
                listStyle: 'none',
            }}>
                <li>
                    <a href="/chat/new" style={{ display: 'block', padding: '0.5em 1em', color: 'white', textDecoration: 'none' }}>
                        Nouvelle conversation
                    </a>
                </li>
            </ul>
        </details>
    );
}
