import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Message } from './@types/websockets';

@WebSocketGateway({ cors: { origin: '*' } })
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server;
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized !');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('Client connected:', client.id);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('data')
  handleMessage(client: Socket, message: Message): string {
    this.server
      .to(message.id)
      .emit('Websocket-message: watt:', message.watt, '-date:', message.date);
    return 'Data sent';
  }
  @SubscribeMessage('join')
  handleJoin(client: Socket, id: string): string {
    client.join(id);
    client.emit('id', id);
    return 'Connected';
  }
}
