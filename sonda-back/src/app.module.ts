import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SondaModule } from './sonda/sonda.module';

@Module({
  imports: [SondaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
