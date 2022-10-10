import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SendOtpDto } from 'src/validation';
import * as https from 'https';

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

  async generateJwt(data: {
    sub: String;
    phoneNumber: String;
  }): Promise<{ access_token: string }> {
    const payload = data;

    const secret = this.config.get('SECRET_KEY');

    const token = await this.jwt.signAsync(payload, {
      secret,
    });

    return { access_token: token };
  }

  async sendOtp(dto: SendOtpDto) {
    const number = this.config.get('SMS_SENDING_NUMBER');
    const path = this.config.get('SMS_SENDING_PATH');

    const data = JSON.stringify({
      from: number,
      to: dto.phoneNumber,
      text: `Welcome to Time Watch\nYour Code is ${dto.otp}`,
    });

    const options = {
      hostname: 'console.melipayamak.com',
      port: 443,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    };

    const req = https.request(options);

    req.write(data);
    req.end();
  }

  async decodeJwt(token: string) {
    const data = this.jwt.decode(token);
    return data;
  }
}
