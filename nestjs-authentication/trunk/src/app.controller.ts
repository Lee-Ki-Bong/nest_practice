import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { GetCurrentUserById } from './utils/decorators';
import { JwtAuthGuard } from './utils/guards/jwt-guards';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@GetCurrentUserById() userId: number): string {
    console.log(userId);
    return this.appService.getHello();
  }
}
