import { Module } from '@nestjs/common';
import { SondaGateway } from './sonda.gateway';

@Module({
  providers: [SondaGateway],
})
export class SondaModule {}
