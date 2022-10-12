import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';
import { AddCompanyDto, FindByPhoneDto, SignUpDto } from '../validation';

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

  async updateOtp(phoneNumber: String, otp: Number) {
    const user = await this.user.findOneAndUpdate(
      { phoneNumber: phoneNumber },
      { otp: otp, confirmOtp: false },
      { new: true },
    );

    return user;
  }

  async updateConfirmOtp(phoneNumber: String) {
    const user = await this.user.findOneAndUpdate(
      { phoneNumber: phoneNumber },
      { confirmOtp: true },
      { new: true },
    );
    return user;
  }

  async addCompany(dto: AddCompanyDto) {
    const company = await this.user.findByIdAndUpdate(
      dto.userId,
      { company: dto.companyId },
      { new: true },
    );

    return company;
  }

  async find(userId: String) {
    const user = await this.user.findById(userId);
    return user;
  }
}
