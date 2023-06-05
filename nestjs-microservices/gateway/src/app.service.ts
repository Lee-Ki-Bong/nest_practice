import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '커뮤니케이터 안녕?';
  }
}
