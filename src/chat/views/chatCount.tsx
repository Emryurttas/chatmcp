import { PropsWithChildren } from "@kitajs/html";

export function ChatCount(props: PropsWithChildren<{ count: number }>): JSX.Element {
    return (
        <div
            id="chat-count"
            hx-swap-oob="true"
            style={{
                textAlign: 'center',
                flexGrow: 1,
                color: 'white',
            }}
        >
            <span>{props.count} conversation{props.count > 1 ? 's' : ''}</span>

            <button
                type="button"
                class="btn-search"
                hx-get="/chat/searchForm"
                hx-target="#chat-count"
                hx-swap="innerHTML"
                title="Rechercher un titre"
            >
                <i class="fas fa-search"></i>
            </button>
        </div>
    );
}
