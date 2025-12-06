import { PropsWithChildren } from "@kitajs/html";
import { UserDropdown } from "./user-dropdown";
import { ChatDropdown } from "../chat/views/chat-dropdown";
import { ChatTitleDisplay } from "../chat/views/chat-title";

export function NavBar(props: PropsWithChildren<{ 
    user?: { userName: string }; 
    chatTitle?: string;
    chatId?: string;
}>): JSX.Element {
    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5em 2%',
            backgroundColor: '#2c3e50',
            color: 'white'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
                <img 
                    src="/images/bot.png" 
                    alt="Chatbot Logo" 
                    style={{ height: '2em', width: 'auto' }} 
                />
                <a href="/"><strong>ChatMCP</strong></a>
                {props.chatTitle && props.chatId && (
                    <ChatTitleDisplay title={props.chatTitle} chatId={props.chatId} />
                )}
            </div>

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
