import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { Message } from './@types/websockets';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server;
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized !');
  }

  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    this.logger.log('Client connected:', client.id);
  }
  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('data')
  handleMessage(@ConnectedSocket() client: Socket, message: Message): string {
    this.server
      .to(message.id)
      .emit('Websocket-message: watt:', message.watt, '-date:', message.date);
    return 'Data sent';
  }
  @SubscribeMessage('join')
  handleJoin(@ConnectedSocket() client: Socket, id: string): string {
    client.join(id);
    client.emit('id', id);
    return 'Connected';
  }
}
