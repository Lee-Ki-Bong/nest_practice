import {
  ArgumentMetadata,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FreezePipe implements PipeTransform {
  private readonly logger = new Logger(FreezePipe.name, {
    timestamp: true,
  });

  transform(value: any, metadata: ArgumentMetadata) {
    this.logger.log(`FreezePipe Processing...`, {
      timestamp: true,
    });
    Object.freeze(value);
    return value;
  }
}
