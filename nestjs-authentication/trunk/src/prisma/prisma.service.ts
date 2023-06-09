import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      datasources: {
        db: {
          url: 'mysql://root:root_password@nestjs-authentication-mysql-1:3306/nestjs?schema=public',
        },
      },
    });
  }

  /**
   * @override OnModuleInit
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * @override OnModuleDestroy
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
