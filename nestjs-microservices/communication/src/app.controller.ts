import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller('communication')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'sayHelloCommunicator' })
  async getHello(data): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 6000));
    console.log(data);
    return this.appService.getHello();
  }
}
