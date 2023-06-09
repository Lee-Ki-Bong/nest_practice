import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import * as users from '../users.json';
import { JwtService } from '@nestjs/jwt';
import { SignDto } from './dto/sign.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Tokens } from '../utils/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async hashData(data: string) {
    return await bcrypt.hash(data, 10);
  }

  signInLocal(dto: AuthDto) {
    const user = users.find((_user) => _user.email === dto.email);
    if (!user) throw new UnauthorizedException('자격증명이 잘못 되었습니다.');
    if (user.password !== dto.password)
      throw new UnauthorizedException('자격증명이 잘못 되었습니다.');

    const signDto: SignDto = {
      id: user.id,
      email: user.email,
      type: 'user',
    };
    return this.singUser(signDto);
  }

  async signUpLocal(dto: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(dto.password);
    const newUser = this.prismaService.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });

    const tokens: Tokens = {
      access_token: '',
      refresh_token: '',
    };
    return tokens;
  }

  private singUser(dto: SignDto) {
    return this.jwtService.signAsync({
      sub: dto.id,
      email: dto.email,
      claim: dto.type,
    });
  }

  logout() {}

  refreshTokens() {}
}
