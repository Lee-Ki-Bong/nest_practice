import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, tap, timeout } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);
  constructor(
    @Inject('COMMUNICATOR') private readonly clientCommunicator: ClientProxy,
  ) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    this.logger.log(JwtAuthGuard.name);

    console.log(context.getType());

    const communicationRes = this.clientCommunicator
      .send({ cmd: 'sayHelloCommunicator' }, { msg: '인증 서버로 인증' })
      .pipe(
        timeout(5000),
        tap((res) => {
          console.log(res);
        }),
        catchError(() => {
          throw new UnauthorizedException('5초가 지났어');
        }),
      );

    return communicationRes;
  }
}
