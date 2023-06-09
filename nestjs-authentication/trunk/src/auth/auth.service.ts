import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
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

  private async hashData(data: string) {
    return await bcrypt.hash(data, 10);
  }

  async signInLocal(dto: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException('자격증명이 잘못 되었습니다.');

    const passwordMatches = await bcrypt.compare(dto.password, user.hash);
    if (!passwordMatches)
      throw new UnauthorizedException('자격증명이 잘못 되었습니다.');

    const tokens = await this.getTokens(user);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async signUpLocal(dto: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(dto.password);
    const newUser = await this.prismaService.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });
    const tokens: Tokens = await this.getTokens(newUser);
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  private async updateRtHash(userId: number, refreshToken: string) {
    const refreshTokenHash = await this.hashData(refreshToken);
    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        hashedRt: refreshTokenHash,
      },
    });
  }

  private async getTokens(dto: SignDto): Promise<Tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: dto.id,
          email: dto.email,
        },
        { secret: 'super-secret-nms-access', expiresIn: '60s' }, // 일반적으로 15분 60 * 15
      ),
      this.jwtService.signAsync(
        {
          sub: dto.id,
          email: dto.email,
        },
        { secret: 'super-secret-nms-refresh', expiresIn: '60s' }, // 일반적으로 7일 60 * 60 * 24 * 7
      ),
    ]);
    const tokens: Tokens = {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
    return tokens;
  }

  async logout(userId: number) {
    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        hashedRt: null,
      },
    });
    return true;
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new UnauthorizedException('Access Denied');

    const refreshTokenMatches = bcrypt.compare(refreshToken, user.hashedRt);
    if (!refreshTokenMatches) throw new UnauthorizedException('Access Denied');
    return true;
  }
}
