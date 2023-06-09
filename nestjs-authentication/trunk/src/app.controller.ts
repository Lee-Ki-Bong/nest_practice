import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { GetCurrentUserById, Public } from './utils/decorators';
import {} from './utils/guards/jwt-refresh-guards';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@GetCurrentUserById() userId: number): string {
    console.log(userId);
    return this.appService.getHello();
  }
}
