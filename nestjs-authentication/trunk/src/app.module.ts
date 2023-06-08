import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAccessStrategy } from './auth/strategy/jwt-access.strategy';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService, JwtAccessStrategy],
})
export class AppModule {}
