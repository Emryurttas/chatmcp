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
        <nav class="app-navbar">
            <div class="navbar-left">
                <img 
                    src="/images/bot.png" 
                    alt="Chatbot Logo" 
                    class="navbar-logo"
                />
                <a href="/" class="navbar-brand">ChatMCP</a>

                {props.chatTitle && props.chatId && !props.isDiscussPage && (
                    <span class="navbar-chat-title">
                        <ChatTitleDisplay title={props.chatTitle} chatId={props.chatId} />
                    </span>
                )}
            </div>

            <div class="navbar-center">
                {props.isDiscussPage ? 'Salon de discussion' : props.children}
            </div>

            {typeof props.chatCount === 'number' && (
                <span id="chat-count">
                    <ChatCount count={props.chatCount} />
                </span>
            )}

            <ul class="navbar-right">
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
