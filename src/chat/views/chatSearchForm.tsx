import { PropsWithChildren } from "@kitajs/html";

export function ChatSearchForm(props: PropsWithChildren<{ searchText?: string }>): JSX.Element {
    return (
        <div 
            id="chat-count" 
            hx-swap-oob="true"
        >
            <form 
                hx-get="/chat/list" 
                hx-target=".chat-list" 
                hx-swap="innerHTML"
            >
                <input 
                    type="text" 
                    name="searchText" 
                    placeholder="Rechercher un titre..."
                    value={props.searchText || ''}
                />
                <button type="submit" class="btn-search">
                    <i class="fas fa-search"></i>
                </button>
            </form>
        </div>
    );
}