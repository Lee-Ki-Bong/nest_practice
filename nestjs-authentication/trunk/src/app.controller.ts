import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { GetCurrentUserById } from './utils/decorators';
import { JwtAccessAuthGuard } from './utils/guards/jwt-access-guards';
import {} from './utils/guards/jwt-refresh-guards';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAccessAuthGuard)
  @Get()
  getHello(@GetCurrentUserById() userId: number): string {
    console.log(userId);
    return this.appService.getHello();
  }
}
