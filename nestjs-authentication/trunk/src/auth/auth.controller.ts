import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('local/singin')
  signInLocal(@Body() dto: AuthDto) {
    return this.authService.signInLocal(dto);
  }

  @Post('local/singup')
  signUpLocal(@Body() dto: AuthDto) {
    return this.authService.signUpLocal(dto);
  }
}
