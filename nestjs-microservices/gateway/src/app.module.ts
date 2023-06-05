import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMMUNICATOR',
        transport: Transport.TCP,
        options: { host: 'nestjs-microservices-communication-1', port: 3001 },
      },
      {
        name: 'ANALYTICS',
        transport: Transport.TCP,
        options: { host: 'nestjs-microservices-analytics-1', port: 3003 },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
