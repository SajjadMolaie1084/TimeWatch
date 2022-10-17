import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { fcmDto, SignInDto, SignUpDto, VerifyDto } from '../validation';
import { UserRepository } from './user.repository';
import { initializeApp } from 'firebase-admin/app';

@Injectable()
export class UserService {
  constructor(
    private UserRepository: UserRepository,
    private AuthService: AuthService,
  ) { }

  async signUp(dto: SignUpDto): Promise<{ access_token: string }> {
    const findUser = await this.UserRepository.findByPhone({
      phoneNumber: dto.phoneNumber,
    });

    // if user find throw error
    if (findUser !== null)
      throw new HttpException('User Already exists', HttpStatus.CONFLICT);

    // create user using user repository
    const user = await this.UserRepository.create(dto);

    // generate token
    const token = await this.AuthService.generateJwt({
      sub: user.id,
      phoneNumber: user.phoneNumber,
    });

    // return token
    return token;
  }

  async signIn(dto: SignInDto) {
    // try to find user in data base
    const findUser = await this.UserRepository.findByPhone({
      phoneNumber: dto.phoneNumber,
    });

    // if user not found throw error
    if (findUser === null)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    // generate new otp to change it
    const otp = await this.AuthService.generateOtp();

    // update otp from data base
    const updateOtp = await this.UserRepository.updateOtp(dto.phoneNumber, otp);

    // send otp using auth service
    const sendOtp = await this.AuthService.sendOtp({
      phoneNumber: dto.phoneNumber,
      otp: updateOtp.otp.toString(),
    });


    return { otp: 0 }
    // throw new HttpException('SMS send successfully', HttpStatus.OK);
  }

  async verify(dto: VerifyDto) {
    // try to find User
    const user = await this.UserRepository.findByPhone({
      phoneNumber: dto.phoneNumber,
    });

    // if user not found throw error
    if (user === null)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    // check otp and confirm otp
    if (parseInt(dto.otp) !== user.otp || user.confirmOtp !== false)
      throw new HttpException('Invalid Otp', HttpStatus.UNPROCESSABLE_ENTITY);

    // update confirm otp
    const confirmOtp = await this.UserRepository.updateConfirmOtp(
      dto.phoneNumber,
    );

    // generate new token
    const token = await this.AuthService.generateJwt({
      sub: user.id,
      phoneNumber: dto.phoneNumber,
    });

    // return token
    // throw new HttpException(token, HttpStatus.OK);
    return { token: token }
  }

  async addEnter(headers) {
    // decode token
    const authorization = headers.authorization;
    const token = authorization.replace('Bearer ', '');
    const data = await this.AuthService.decodeJwt(token);

    const user = await this.UserRepository.find(data.sub);

    const date = Date.now();

    const enter = await this.UserRepository.addEnter({
      company: user.company,
      user: user.id,
      date: date,
      firstName: user.firstName,
      lastName: user.lastName
    });
    return { enter };
  }

  async addExit(headers) {
    // decode token
    const authorization = headers.authorization;
    const token = authorization.replace('Bearer ', '');
    const data = await this.AuthService.decodeJwt(token);

    const user = await this.UserRepository.find(data.sub);

    const date = Date.now();

    const exit = await this.UserRepository.addExit({
      company: user.company,
      user: user.id,
      date: date,
      firstName: user.firstName,
      lastName: user.lastName
    });
    return { exit };
  }
  //update user google FCM id
  async FCM(headers, dto: fcmDto) {
    // decode token
    const authorization = headers.authorization;
    const token = authorization.replace('Bearer ', '');
    const data = await this.AuthService.decodeJwt(token);
    const user = await this.UserRepository.find(data.sub);
    user.fcm = dto.fcmID;
    user.save().then((x) => {
      return {result:1};
    }
    ).catch((error) => {
      return {result:0};
    }
    );

  }
}
