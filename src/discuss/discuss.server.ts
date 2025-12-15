import { Server as HttpServer } from "http";
import { Server as IoServer, Socket } from "socket.io";
import { Redis } from "iovalkey";

export class DiscussServer {
    private static io: IoServer;
    private static publishClient: Redis;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static create(httpServer: HttpServer, sessionMiddleware: any) {
        DiscussServer.publishClient = new Redis();
        
        const subscribeClient = new Redis();
        
        subscribeClient.subscribe("info", "message", (err, count) => {
            if (err) {
                console.error("Échec de l'abonnement : %s", err.message);
            } else {
                console.log(
                    `Abonnement réussi ! Ce client est actuellement abonné à ${count} canaux.`
                );
            }
        });
        
        subscribeClient.on("message", (channel, message) => {
            if (channel === "info") {
                DiscussServer.io.emit("info", message);
            } else if (channel === "message") {
                const messageData = JSON.parse(message);
                DiscussServer.io.emit("message", messageData);
            }
        });
        
        DiscussServer.io = new IoServer(httpServer);
        DiscussServer.io.engine.use(sessionMiddleware);
        DiscussServer.io.on('connection', DiscussServer.onClientConnection);
    }
     
    private static onClientConnection(socket: Socket): void {
        const userName = socket.request.session.user.userName;
        const info = `${userName} a rejoint la discussion`;
        console.log(info);
        DiscussServer.publishClient.publish('info', info);

        socket.on('message', (messageContent: string) => {
            const messageData = {
                sender: userName,
                date: new Date().toISOString(),
                content: messageContent
            };
            DiscussServer.publishClient.publish('message', JSON.stringify(messageData));
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        socket.on('disconnect', (reason) => {
            const leaveMessage = `${userName} a quitté la discussion`;
            console.log(leaveMessage);
            DiscussServer.publishClient.publish('info', leaveMessage);
        });
    }
}