import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtRefreshAuthGuard } from 'src/utils/guards/jwt-refresh-guards';
import { Tokens } from 'src/utils/types';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import {
  GetCurrentUser,
  GetCurrentUserById,
  Public,
} from 'src/utils/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('local/singin')
  @HttpCode(HttpStatus.OK)
  signInLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signInLocal(dto);
  }

  @Public()
  @Post('local/singup')
  @HttpCode(HttpStatus.CREATED)
  signUpLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signUpLocal(dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserById() userId: number) {
    return this.authService.logout(userId);
  }

  @Public() // 전역 가드를 실행 하지 않도록 하기위해.
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
