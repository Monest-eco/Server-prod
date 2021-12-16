import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/data' })
export class AppGateway {
  @WebSocketServer() server;
  @SubscribeMessage('message')
  handleMessage(client: Socket, message: { id: string; data: string }): string {
    this.server.to(message.id).emit('message', message.data);
    return 'Message sent';
  }
  @SubscribeMessage('join')
  handleJoin(client: Socket, id: string): string {
    client.join(id);
    client.emit('id', id);
    return 'Connected';
  }
}
