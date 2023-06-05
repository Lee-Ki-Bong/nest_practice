import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller('communication')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'sayHelloCommunicator' })
  getHello(data): string {
    console.log(data);
    return this.appService.getHello();
  }
}
