import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EnterExit } from 'src/models/enterExit.model';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';
import {
  AddCompanyDto,
  AddEnterExitDto,
  FindByPhoneDto,
  SignUpDto,
} from '../validation';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User') private user: Model<User>,
    @InjectModel('EnterExit') private enterExit: Model<EnterExit>,
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

  async addEnter(dto: AddEnterExitDto) {
    const enter = await this.enterExit.create({
      firstName:dto.firstName,
      lastName:dto.lastName,
      company: dto.company,
      user: dto.user,
      date: dto.date,
      type: 'Enter',
    });
    console.log(enter);
    return enter;
  }

  async addExit(dto: AddEnterExitDto) {
    const exit = await this.enterExit.create({
      firstName:dto.firstName,
      lastName:dto.lastName,
      company: dto.company,
      user: dto.user,
      date: dto.date,
      type: 'Exit',
    });
    console.log(exit);
    return exit;
  }

  async enterAndExitLogs(companyId: String) {
    const logs = await this.enterExit.find({
      //  company: companyId 
      });
    return logs;
  }
  async enterAndExitUserLogs(companyId: String, userId: String) {
    const logs = await this.enterExit.find({
      // company: companyId,
      user: userId,
    });
    return logs;
  }
}
