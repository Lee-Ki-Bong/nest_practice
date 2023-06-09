import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/utils/types';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'accessGuard',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'super-secret-nms-access',
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
