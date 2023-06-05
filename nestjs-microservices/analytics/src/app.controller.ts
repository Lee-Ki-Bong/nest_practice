import { Controller, ExecutionContext } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  TcpContext,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly conversations: any[] = [];
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'conversationLog' })
  conversationLog(data) {
    this.conversations.push(data);
    console.log(`대화 기록`, data);
  }

  @EventPattern({ cmd: 'getLog' })
  getLog() {
    return this.conversations;
  }
}
