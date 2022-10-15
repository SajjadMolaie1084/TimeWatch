import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { sendInviteMessageDto, SendOtpDto } from 'src/validation';
import * as https from 'https';
import * as md5 from 'md5';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private readonly config: ConfigService,
  ) { }
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
    // get sneder number and path from .env file
    const number = this.config.get('SMS_SENDING_NUMBER');
    const path = this.config.get('SMS_SENDING_PATH');

    // create json data
    const data = JSON.stringify({
      from: number,
      to: dto.phoneNumber,
      text: `Welcome to Time Watch\nYour Code is ${dto.otp}`,
    });

    // add connection
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

    // request to connection
    const req = https.request(options, res => {
      console.log('statusCode: ' + res.statusCode);

      res.on('data', d => {
        process.stdout.write(d)
      });
    });
    req.on('error', error => {
      console.error(error);
    });

    // post data to connection
    req.write(data);
    req.end();
  }
  async sendInviteMessage(dto: sendInviteMessageDto) {
    // get sneder number and path from .env file
    const number = this.config.get('SMS_SENDING_NUMBER');
    const path = this.config.get('SMS_SENDING_PATH');

    // create json data
    const data = JSON.stringify({
      from: number,
      to: dto.phoneNumber,
      text: `You Have a request from ${dto.companyName} to join this company click here http://192.168.172.1:3000/invite/${dto.link}`,
    });

    // add connection
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

    // request to connection
    const req = https.request(options);

    // post data to connection
    req.write(data);
    req.end();
  }
  async decodeJwt(token: string) {
    const data = this.jwt.decode(token);
    return data;
  }
  async hash(data: string) {
    const hash = await md5(data);
    return hash;
  }
}
