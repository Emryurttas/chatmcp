import { PropsWithChildren } from "@kitajs/html";

export function NavBar(props: PropsWithChildren<{ user?: { userName: string } }>): JSX.Element {
    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem 1rem',
            backgroundColor: '#2c3e50',
            color: 'white'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <img 
                    src="/images/bot.png" 
                    alt="Chatbot Logo" 
                    style={{ width: '40px', height: '40px' }} 
                />
                <strong>ChatMCP</strong>
            </div>

            <ul style={{
                listStyle: 'none',
                display: 'flex',
                gap: '1rem',
                margin: 0,
                padding: 0,
                alignItems: 'center'
            }}>
                <li><a href="/" style={{ color: 'white' }}>Accueil</a></li>
                {props.children}
                {props.user && (
                    <li>Bienvenue, {props.user.userName}</li>
                )}
            </ul>
        </nav>
    );
}
