import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAccessAuthGuard } from 'src/utils/guards/jwt-access-guards';
import { JwtRefreshAuthGuard } from 'src/utils/guards/jwt-refresh-guards';
import { Tokens } from 'src/utils/types';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local/singin')
  @HttpCode(HttpStatus.OK)
  signInLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signInLocal(dto);
  }

  @Post('local/singup')
  @HttpCode(HttpStatus.CREATED)
  signUpLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signUpLocal(dto);
  }

  @UseGuards(JwtAccessAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() res: Request) {
    return this.authService.logout(res.user['sub']);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens() {
    return this.authService.refreshTokens();
  }
}
