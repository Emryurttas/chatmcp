import { PropsWithChildren } from "@kitajs/html";

export function ChatCount(props: PropsWithChildren<{ count: number }>): JSX.Element {
    return (
        <div style={{
            textAlign: 'center',
            flexGrow: 1,
            color: 'white',
        }}>
            {props.count} conversation{props.count > 1 ? 's' : ''}
        </div>
    );
}
