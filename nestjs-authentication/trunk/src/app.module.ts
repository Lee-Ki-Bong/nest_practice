import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAccessStrategy } from './auth/strategy/jwt-access.strategy';
import { ServiceModule } from './service/service.module';
import { ModuleModule } from './module/module.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, ServiceModule, ModuleModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, JwtAccessStrategy],
})
export class AppModule {}
