import { Server as HttpServer } from "http";
import { Server as IoServer, Socket } from "socket.io";
import { Redis } from "iovalkey";
import { valkey } from "../services/valkey";

export class DiscussServer {
    private static io: IoServer;
    private static publishClient: Redis;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static create(httpServer: HttpServer, sessionMiddleware: any) {
        DiscussServer.io = new IoServer(httpServer);
        DiscussServer.io.engine.use(sessionMiddleware);
        DiscussServer.io.on('connection', DiscussServer.onClientConnection);

        DiscussServer.publishClient = new Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379', 10),
            password: process.env.REDIS_PASSWORD || undefined,
        });

        DiscussServer.publishClient.connect().then(() => {
            console.log('Redis publishClient connecté');
        }).catch((err) => {
            console.error('Erreur connexion Redis publishClient :', err);
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private static onClientConnection(socket: Socket): void {
        const userName = socket.request.session.user.userName;
        const info = `${userName} a rejoint la discussion`;
        console.log(info);
        DiscussServer.io.emit('info', info);

        socket.on('message', (messageContent: string) => {
            const messageData = {
                sender: userName,
                date: new Date().toISOString(),
                content: messageContent
            };
            DiscussServer.io.emit('message', messageData);
        });

        socket.on('disconnect', (reason) => {
            const leaveMessage = `${userName} a quitté la discussion`;
            console.log(leaveMessage);
            DiscussServer.io.emit('info', leaveMessage);
        });
    }
}