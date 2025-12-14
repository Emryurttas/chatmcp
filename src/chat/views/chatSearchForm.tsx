import { PropsWithChildren } from "@kitajs/html";

export function ChatSearchForm(props: PropsWithChildren<{ searchText?: string }>): JSX.Element {
    return (
        <div 
            id="chat-count" 
            hx-swap-oob="true"
            style={{ textAlign: 'center', flexGrow: 1, color: 'white', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}
        >
            <form 
                hx-get="/chat/list" 
                hx-target=".chat-list" 
                hx-swap="innerHTML"
                style={{ display: 'flex', gap: '4px', alignItems: 'center' }}
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