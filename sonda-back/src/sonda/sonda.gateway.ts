import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { SondaService } from './sonda.service';
import { CreateSondaDto } from './dto/create-sonda.dto';
import { UpdateSondaDto } from './dto/update-sonda.dto';
import { Logger } from '@nestjs/common';
import {Server,Socket} from 'socket.io';
import { Sonda } from './entities/sonda.entity';
import { UnitController } from './entities/unit_controller';

@WebSocketGateway(4444)
export class SondaGateway implements OnGatewayInit, OnGatewayConnection , OnGatewayDisconnect{
  private logger = new Logger();
  @WebSocketServer()
  public static server: Server;

  constructor(private readonly sondaService: SondaService) {}


  @SubscribeMessage('command')
  create(client: Socket, data: string) {
    this.logger.debug(data);
    const base  = UnitController.get_instance();
    base.interpret_command(client.id,data);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
    SondaGateway.server = server;
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    const base  = UnitController.get_instance();
    const sonda = new Sonda(client.id,base)
    
   console.log(SondaGateway.server);
  
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    UnitController.get_instance().remove_sonda(client.id);
  }
}
