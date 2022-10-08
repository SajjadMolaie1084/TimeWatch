import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private readonly config: ConfigService,
  ) {}
  generateOtp(): number {
    // generate otp using Math
    const otp = Math.floor(Math.random() * 10000);

    // return otp code
    return otp;
  }

  async generateJwt(data: object): Promise<{ access_token: string }> {
    const payload = data;

    const secret = this.config.get('SECRET_KEY');

    const token = await this.jwt.signAsync(payload, {
      secret,
    });

    return { access_token: token };
  }
}
