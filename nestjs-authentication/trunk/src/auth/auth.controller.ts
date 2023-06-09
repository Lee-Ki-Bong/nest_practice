import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAccessAuthGuard } from 'src/utils/guards/jwt-access-guards';
import { JwtRefreshAuthGuard } from 'src/utils/guards/jwt-refresh-guards';
import { Tokens } from 'src/utils/types';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { GetCurrentUser, GetCurrentUserById } from 'src/utils/decorators';

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
  logout(@GetCurrentUserById() userId: number) {
    return this.authService.logout(userId);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserById() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
