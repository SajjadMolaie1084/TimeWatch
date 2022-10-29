import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EnterExit } from 'src/enterExit/model/enterExit.model';
import { enterExitDto } from 'src/validation';
import { CompanyUserService } from '../companyUser/companyUser.service';

@Injectable()
export class EnterExitService {
  constructor(
    @InjectModel('EnterExit') private EnterExit: Model<EnterExit>,
    private companyUserService: CompanyUserService
  ) { }
  async create(dto: enterExitDto,user): Promise<EnterExit> {
    const date = Date.now();
    return  await this.EnterExit.create({
      company: dto.company,
      location:dto.location,
      user: user.uid,
      date: date,
      type:dto.type
    });
  }
  async findAllbyCompany(cid: string,user) {
    return await this.EnterExit.find({company:cid,user:user.uid}).exec();
  }
  async findAllbyUser(uid: string) {
    return await this.EnterExit.find({user:uid}).exec();
  }
  async findAll(user) {
    var userCompany=await this.companyUserService.findAll(user.uid);
    return await this.EnterExit.find({user:user.uid}).populate('company').populate('user').populate('location').exec();

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
