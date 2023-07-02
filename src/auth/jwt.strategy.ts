import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { CompanyUserService } from '../companyUser/companyUser.service';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(private companyUserService: CompanyUserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        '4c911f98c72e3aa5992b7b8558fec2266234cec53495a4f6624d7717bf01881cc89a7bdb11add8d5b1e1f33e1d92153bb23bb62692de6b9cb9d7471a9cd26244',
    });
  }

  async validate(payload: any) {
    var user = {
      uid: payload.uid,
      firstName: payload.firstName,
      lastName: payload.lastName,
      phoneNumber: payload.phoneNumber,
      iat: payload.iat,
      company: {},
    };
    user.company = await this.companyUserService.findAll(payload.uid);
    return user;
  }
}
