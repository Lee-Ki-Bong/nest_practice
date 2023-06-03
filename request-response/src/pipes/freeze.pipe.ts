import {
  ArgumentMetadata,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FreezePipe implements PipeTransform {
  private readonly logger = new Logger(FreezePipe.name);

  transform(value: any, metadata: ArgumentMetadata) {
    this.logger.log(`FreezePipe Processing...`);
    Object.freeze(value);
    return value;
  }
}
