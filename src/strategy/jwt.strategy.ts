import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        '4c911f98c72e3aa5992b7b8558fec2266234cec53495a4f6624d7717bf01881cc89a7bdb11add8d5b1e1f33e1d92153bb23bb62692de6b9cb9d7471a9cd26244',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
