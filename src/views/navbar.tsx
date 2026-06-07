import { PropsWithChildren } from "@kitajs/html";
import { UserDropdown } from "../user/views/user-dropdown";
import { ChatDropdown } from "../chat/views/chat-dropdown";
import { ChatTitleDisplay } from "../chat/views/chat-title";
import { ChatCount } from "../chat/views/chatCount";

export function NavBar(props: PropsWithChildren<{ 
    user?: { userName: string }; 
    chatTitle?: string;
    chatId?: string;
    chatCount?: number;
    isDiscussPage?: boolean;
}>): JSX.Element {
    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5em 3%',
            backgroundColor: '#2c3e50',
            color: 'white'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1em' }}>
                <img 
                    src="/images/bot.png" 
                    alt="Chatbot Logo" 
                    style={{ height: '2em', width: 'auto' }} 
                />
                <a href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>ChatMCP</a>

                {props.chatTitle && props.chatId && !props.isDiscussPage && (
                    <ChatTitleDisplay title={props.chatTitle} chatId={props.chatId} />
                )}
            </div>

            <div style={{ flex: 1, textAlign: 'center'}}>
                {props.isDiscussPage ? 'Salon de discussion' : props.children}
            </div>

            {typeof props.chatCount === 'number' && (
                <span id="chat-count">
                    <ChatCount count={props.chatCount} />
                </span>
            )}

            <ul style={{
                listStyle: 'none',
                display: 'flex',
                gap: '1em',
                margin: 0,
                padding: 0,
                alignItems: 'center'
            }}>
                <li>
                    <ChatDropdown user={props.user} />
                </li>
                <li>
                    <UserDropdown user={props.user} />
                </li>
            </ul>
        </nav>
    );
}