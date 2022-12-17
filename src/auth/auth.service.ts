import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { sendInviteMessageDto, SendOtpDto,fcmDto, SignInDto, SignUpDto, VerifyDto } from 'src/validation';
import * as https from 'https';
import * as md5 from 'md5';



@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private readonly config: ConfigService,
    private userService: UserService,
  ) { }


  generateOtp(): number {
    // generate otp using Math
    const otp = Math.floor(Math.random() * 10000);

    // return otp code
    return otp;
  }
  async signUp(dto: SignUpDto){
    const findUser = await this.userService.findByPhone(dto.phoneNumber);
    // if user find throw error
    if (findUser !== null)
      throw new HttpException('User Already exists', HttpStatus.CONFLICT);
    
    // create user using user repository
    return await this.userService.create(dto);

  }
  async signIn(dto: SignInDto) {
    // try to find user in data base
    const findUser = await this.userService.findByPhone(dto.phoneNumber);

    // if user not found throw error
    if (findUser === null)
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)

    // generate new otp to change it
    const otp = await this.generateOtp();

    // update otp from data base
    const updateOtp = await this.userService.updateOtp(dto.phoneNumber, otp);

    // send otp using auth service
    const sendOtp = await this.sendOtp({
      phoneNumber: dto.phoneNumber,
      otp: otp.toString(),
    });

    return {otp: otp}
  }
  async verify(dto: VerifyDto) {
    // try to find User
    const user = await this.userService.findByPhone(dto.phoneNumber);

    // if user not found throw error
    if (user === null)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    // check otp and confirm otp
    if (parseInt(dto.otp) !== user.otp ||  Math.abs(Date.now()-user.otpDate)>1000*120 )
      throw new HttpException('Invalid Otp', HttpStatus.UNPROCESSABLE_ENTITY);

    
    // generate new token
    const token = await this.generateJwt({
      uid:user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber
    });


    return  token 
  }
  async generateJwt(data): Promise<{ access_token: string }> {
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
    // const data = JSON.stringify({
    //   from: number,
    //   to: dto.phoneNumber,
    //   text: `Your Code is ${dto.otp}`,
    // });
    const data = JSON.stringify({
      "PhoneNumber": dto.phoneNumber,
      "CustomPatternID": "7dd0d724-b228-492b-9f21-ff7c1e540e2b",
      "Values": dto.otp,
      "WithSignature": false,
      "Token": "a2FydGVhbTA1NTk1ODIyMDFhMkZ5ZEdWaGJRPT0=",
      "ProjectType": 0
    });

    // add connection
    const options = {
      hostname: 'api.mrapi.ir',
      port: 443,
      path: "/V2/sms/custom",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'Authentication':"wU2N1EzNxQTMmJWNzYmMxUWZ0MTOiNTN1IWNhFDZwEmO4YURzUTRGFjM"
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
    console.log(dto.phoneNumber);

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
  async decodeJwt(token: string) {
    const data = this.jwt.decode(token);
    return data;
  }
  async hash(data: string) {
    const hash = await md5(data);
    return hash;
  }
}
