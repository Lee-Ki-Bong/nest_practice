import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthenticationMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const startDate = Date.now();

    // do something

    const processDate = Date.now() - startDate;
    this.logger.log(`${AuthenticationMiddleware.name} +${processDate}ms`);
    next();
  }
}
