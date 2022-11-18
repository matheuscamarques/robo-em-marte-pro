import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnitController } from './sonda/entities/unit_controller';

const first_base = UnitController.get_instance();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    {
      origin: '*',
      credentials: true,
    }
  );
  await app.listen(3000);
}
bootstrap();
