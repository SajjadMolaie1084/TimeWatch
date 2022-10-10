import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class UserSterategy extends PassportStrategy(Strategy, 'user') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        '4c911f98c72e3aa5992b7b8558fec2266234cec53495a4f6624d7717bf01881cc89a7bdb11add8d5b1e1f33e1d92153bb23bb62692de6b9cb9d7471a9cd26244',
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
