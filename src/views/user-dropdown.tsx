import { PropsWithChildren } from "@kitajs/html";

export function UserDropdown(props: PropsWithChildren<{ user?: { userName: string } }>): JSX.Element {
    if (!props.user) {
        return (
            <a href="/user/login" >
                <i class="fas fa-user"></i> Connexion
            </a>
        );
    }

    return (
        <details class="dropdown" style={{ display: 'inline-block', position: 'relative' }}>
            <summary>
                <i class="fas fa-user"></i> {props.user.userName}
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
            }}>
                <li>
                    <a href="/#">
                        Profil
                    </a>
                </li>
                <li>
                    <a href="/user/logout">
                        Déconnexion
                    </a>
                </li>
            </ul>
        </details>
    );
}
