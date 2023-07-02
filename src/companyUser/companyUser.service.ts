import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyUser } from 'src/companyUser/model/companyUser.model';
import { companyUserDto } from 'src/validation';

@Injectable()
export class CompanyUserService {
  constructor(
    @InjectModel('CompanyUser') private CompanyUser: Model<CompanyUser>,
  ) {}
  async create(dto: companyUserDto): Promise<CompanyUser> {
    if (
      await this.CompanyUser.exists({
        user: dto.user,
        company: dto.company,
      }).exec()
    ) {
      throw new HttpException(
        'CompanyUser already exists',
        HttpStatus.CONFLICT,
      );
    } else {
      const date = new Date().getTime();
      return await this.CompanyUser.create({
        user: dto.user,
        company: dto.company,
        role: dto.role,
        date,
      });
    }
  }
  async findAll(uid: String) {
    return await this.CompanyUser.find({ user: uid })
      .lean()
      .populate('company', ['_id', 'name'])
      .populate('user', ['_id', 'firstName', 'lastName', 'phoneNumber', 'fcm'])
      .exec();
  }
  async findAdmin(cid: String) {
    return await this.CompanyUser.find({ company: cid, role: 'Admin' })
      .lean()
      .populate('company', ['_id', 'name'])
      .populate('user', ['_id', 'firstName', 'lastName', 'phoneNumber', 'fcm'])
      .exec();
  }
  async findUser(cid: String) {
    return await this.CompanyUser.find({ company: cid })
      .lean()
      .populate('company', ['_id', 'name'])
      .populate('user', ['_id', 'firstName', 'lastName', 'phoneNumber', 'fcm'])
      .exec();
  }
  async findOne(id: String) {
    return await this.CompanyUser.findOne({ _id: id }).exec();
  }
  async update(id: string, updateCompanyUser: companyUserDto) {
    return await this.CompanyUser.updateOne(
      { _id: id },
      updateCompanyUser,
    ).exec();
  }
  async delete(id: string) {
    return await this.CompanyUser.deleteOne({ _id: id }).exec();
  }
}
