import { PropsWithChildren } from "@kitajs/html";
import { UserDropdown } from "../user/views/user-dropdown";
import { ChatDropdown } from "../chat/views/chat-dropdown";
import { ChatTitleDisplay } from "../chat/views/chat-title";

export function NavBar(props: PropsWithChildren<{ 
    user?: { userName: string }; 
    chatTitle?: string;
    chatId?: string;
    conversationCount?: number;
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

                {props.chatTitle && props.chatId && (
                    <ChatTitleDisplay title={props.chatTitle} chatId={props.chatId} />
                )}
            </div>

            <div style={{ textAlign: 'center' }}>
                {props.conversationCount !== undefined && `Conversations : ${props.conversationCount}`}
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
