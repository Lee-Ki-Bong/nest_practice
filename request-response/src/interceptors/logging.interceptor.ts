import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // 요청
    const request = context.switchToHttp().getRequest();
    const userAgent = request.get('user-agent') || '';
    const { path: url, ip, method } = request;
    const useClass = context.getClass().name;
    const useHandler = context.getHandler().name;
    const now = Date.now();

    this.logger.log(
      `${method} ${url} ${userAgent} ${ip}: ${useClass}().${useHandler}()`,
    );

    // do something

    return next.handle().pipe(
      tap((res) => {
        // 응답
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        const contentLength = response.get('content-length') || '';
        this.logger.log(
          `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}: ${
            Date.now() - now
          } ms`,
        );

        this.logger.debug(res);
      }),
    );
  }
}
