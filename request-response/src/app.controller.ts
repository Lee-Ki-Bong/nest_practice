import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FreezePipe } from './pipes/freeze.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/error')
  exampleError() {
    throw new InternalServerErrorException();
  }

  @Post()
  @UsePipes(FreezePipe)
  examplePost(@Body() body: any) {
    body.title = 1; // 바꾸려고 시도.
    return body.title;
  }
}
