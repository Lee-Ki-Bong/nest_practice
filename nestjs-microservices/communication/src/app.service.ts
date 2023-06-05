import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '안녕 난 커뮤니케이터야';
  }
}
