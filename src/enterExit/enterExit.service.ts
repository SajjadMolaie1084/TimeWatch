import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EnterExit } from 'src/models/enterExit.model';
import { enterExitDto } from 'src/validation';

@Injectable()
export class EnterExitService {
  constructor(
    @InjectModel('EnterExit') private EnterExit: Model<EnterExit>
  ) { }
  async create(dto: enterExitDto,user): Promise<EnterExit> {
    const date = Date.now();
    return  await this.EnterExit.create({
      company: dto.company,
      location:dto.location,
      user: user.id,
      date: date,
      firstName: user.firstName,
      lastName: user.lastName
    });
  }
  async findAllbyCompany(cid: string) {
    return await this.EnterExit.find({company:cid}).exec();
  }
  async findAllbyUser(uid: string) {
    return await this.EnterExit.find({user:uid}).exec();
  }
  async findAll(uid) {
    return await this.EnterExit.find({}).exec();
  }
  async findOne(id: string) {
    return await this.EnterExit.findOne({ _id:id }).exec();
  }
  async update(id: string, updateEnterExit: enterExitDto) {
    return await this.EnterExit.updateOne({ _id: id }, updateEnterExit).exec()
  }
  async delete(id: string) {
    return await this.EnterExit.deleteOne({ _id: id }).exec()
  }
}
