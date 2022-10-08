import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';
import { FindByPhoneDto, SignUpDto } from '../validation';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User') private user: Model<User>,
    private auth: AuthService,
  ) {}

  async create(dto: SignUpDto): Promise<User> {
    // generate otp using auth service
    const otp = this.auth.generateOtp();

    // create user
    const user = await this.user.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      phoneNumber: dto.phoneNumber,
      otp: otp,
    });

    // return created user
    return user;
  }

  async findByPhone(dto: FindByPhoneDto): Promise<User | null> {
    // find user by phone number
    const user = await this.user.findOne({ phoneNumber: dto.phoneNumber });

    // return user
    return user;
  }
}
