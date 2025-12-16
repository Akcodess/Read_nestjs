import { Socket } from "socket.io";
import { SocketIoEventType } from "./../enums/socketio.enum";

export interface SocketIoEvent {
    eventType: SocketIoEventType;
    ioSocket: Socket;
    lightSocket: WebSocket;
    userId: any;
    tenantId: any;
}