import { Module } from '@nestjs/common';
import { SondaService } from './sonda.service';
import { SondaGateway } from './sonda.gateway';

@Module({
  providers: [SondaGateway, SondaService]
})
export class SondaModule {}
