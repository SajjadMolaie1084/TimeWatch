import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { fcmDto, SignUpDto } from '../validation';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model/user.model';


@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private User: Model<User>,
  ) { }

  async create(dto: SignUpDto): Promise<User> {
    if (await this.User.exists({ phoneNumber: dto.phoneNumber }).exec()) {
       throw new HttpException('User already exists', HttpStatus.CONFLICT)
    }
    else {
      return await this.User.create(dto);
    }
  }
  async findAll() {
    return await this.User.find().exec();
  }

  async findOne(id: string) {
    return await this.User.findOne({ _id:id });
  }
  async findByCompany(cid: string) {
    return await this.User.find({ company:cid });
  }
  async findByPhone(phone: String) {
    return await this.User.findOne({ phoneNumber: phone });
  }
  //update user google FCM id
  async updateFCM(uid, dto: fcmDto) {
    return await  this.User.updateOne({_id:uid},{fcm:dto.fcmID}).exec();
  }
  async update(uid, dto: SignUpDto) {
    return await  this.User.updateOne({_id:uid},dto).exec();
  }
  async updateOtp(phoneNumber, otp) {
    return await  this.User.updateOne({phoneNumber:phoneNumber},{otp:otp,otpDate:Date.now()}).exec();
  }
  async delete(uid) {
    return await  this.User.updateOne({_id:uid},{delete:1}).exec();
  }
}
