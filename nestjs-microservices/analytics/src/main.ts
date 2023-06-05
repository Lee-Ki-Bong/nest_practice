import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: 'nestjs-microservices-analytics-1', port: 3003 },
  });
  await app.startAllMicroservices();
  await app.listen(3009);
}
bootstrap();
