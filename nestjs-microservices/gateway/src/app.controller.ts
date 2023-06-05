import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { tap } from 'rxjs';
import { AppService } from './app.service';

@Controller('gateway')
export class AppController {
  constructor(
    @Inject('COMMUNICATOR') private readonly clientCommunicator: ClientProxy,
    @Inject('ANALYTICS') private readonly clientAnalytics: ClientProxy,
    private readonly appService: AppService,
  ) {}

  @Get()
  sayHelloCommunicator() {
    const msg = this.appService.getHello();
    const communicationRes = this.clientCommunicator
      .send({ cmd: 'sayHelloCommunicator' }, { message: msg })
      .pipe(
        tap((response) => {
          this.clientAnalytics.emit(
            { cmd: 'conversationLog' },
            {
              client: msg,
              clientCommunicator: response,
            },
          );
        }),
      );

    return communicationRes;
  }

  @Get('getLog')
  getLog() {
    return this.clientAnalytics.send({ cmd: 'getLog' }, {});
  }
}
