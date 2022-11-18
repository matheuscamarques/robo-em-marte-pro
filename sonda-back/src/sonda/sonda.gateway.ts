import { WebSocketGateway, SubscribeMessage, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import {Server,Socket} from 'socket.io';
import { Sonda } from './entities/sonda';
import { UnitController } from './entities/unit_controller';
import { FileLogger } from './utils/file_logger';

@WebSocketGateway(4444)
export class SondaGateway implements OnGatewayInit, OnGatewayConnection , OnGatewayDisconnect{
  private logger = new Logger();
  @WebSocketServer()
  public static server: Server;

  @SubscribeMessage('command')
  command(client: Socket, data: string) {
    this.logger.debug(data);
    
    const base  = UnitController.get_instance();
    const[before_x, before_y, before_direction] = base.get_sonda_tuple(client.id);
    base.interpret_command(client.id,data);
    const [after_x,after_y,after_direction]     = base.get_sonda_tuple(client.id);
    FileLogger.log(`
      ROVER: ${client.id}
      BEFORE: (${before_x},${before_y}) ${before_direction}
      COMMAND: ${data}
      AFTER: (${after_x},${after_y}) ${after_direction}
    `)
  }

  afterInit(server: Server) {
    this.logger.log('Init');
    SondaGateway.server = server;
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    const base  = UnitController.get_instance();
    const sonda = Sonda.factory(client.id,base)
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    UnitController.get_instance().remove_sonda(client.id);
  }
}
