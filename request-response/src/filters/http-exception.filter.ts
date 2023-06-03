import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name, {
    timestamp: true,
  });

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const exceptionCode = exception.getStatus();

    const resJson = {
      statusCode: exceptionCode,
      timestamp: new Date().toString(),
      path: request.url,
    };

    this.logger.error(resJson);
    response.status(exceptionCode).json(resJson);
  }
}
