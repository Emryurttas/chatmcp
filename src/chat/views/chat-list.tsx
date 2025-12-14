import { User } from "../../user/user";
import { ChatInfo } from "../chat";
import { ChatTitleDisplay } from "./chat-title";

function ChatListItem(chat: ChatInfo): JSX.Element {
    const chatIdStr = chat._id?.toString() || '';

    return (
        <li class="chat-item" data-id={chatIdStr} id={`chat-item-${chatIdStr}`}>
            <div class="chat-header">
                <div id={`chat-title-${chatIdStr}`}>
                    <ChatTitleDisplay title={chat.title} chatId={chatIdStr} />
                </div>
                <a href={`/chat/${chatIdStr}`} title="Accéder à la conversation" class="chat-access-btn">
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>

            <div class="chat-dates">
                <div>Créée le : {chat.creationDate.toLocaleString()}</div>
                <div>Modifiée le : {chat.lastModificationDate.toLocaleString()}</div>
            </div>

            <div class="chat-footer">
                <span>{chat.messageCount ?? 0} messages</span>
                <button
                    type="button"
                    class="btn-trash"
                    title="Supprimer"
                    hx-delete={`/chat/delete/${chatIdStr}`}
                    hx-confirm="Êtes-vous sûr de vouloir supprimer cette conversation ?"
                    hx-target={`#chat-item-${chatIdStr}`}
                    hx-swap="delete"
                >
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </li>
    );
}

export function ChatList(props: { user: User; chatInfos: ChatInfo[]; page: number; pageSize: number; totalCount: number; searchText?: string }): JSX.Element {
    const { chatInfos, page, pageSize, totalCount, searchText = '' } = props;

    return (
        <ul class="chat-list">
            {chatInfos.map(chat => ChatListItem(chat))}

            {(page * pageSize) < totalCount && (
                <li class="chat-load-more">
                    <a
                        href={`/chat/list?page=${page + 1}&searchText=${encodeURIComponent(searchText)}`}
                        hx-get={`/chat/list?page=${page + 1}&searchText=${encodeURIComponent(searchText)}`}
                        hx-swap="outerHTML"
                        hx-trigger="click"
                        class="btn-load-more"
                    >
                        Cliquez pour afficher les conversations suivantes
                    </a>
                </li>
            )}
        </ul>
    );
}
