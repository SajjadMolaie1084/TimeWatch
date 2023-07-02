import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from 'src/company/model/company.model';
import { CreateCompanyDto } from './dto/company.dto';
import { CompanyUserService } from 'src/companyUser/companyUser.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('Company') private company: Model<Company>,
    private companyUser: CompanyUserService,
  ) {}
  async create(dto: CreateCompanyDto, user): Promise<Company> {
    if (await this.company.exists({ name: dto.name }).exec()) {
      throw new HttpException('Company already exists', HttpStatus.CONFLICT);
    } else {
      const newCompany = await this.company.create({
        name: dto.name,
        phoneNumber: dto.phoneNumber,
        owner: user.uid,
      });

      await this.companyUser.create({
        user: user.uid,
        company: newCompany._id.toString(),
        role: 'Admin',
      });

      return newCompany;
    }
  }
  async findAll(user) {
    return await this.company.find({ owner: user.uid }).exec();
  }
  async findOne(id: string, user) {
    return await this.company.findOne({ _id: id, owner: user.uid }).exec();
  }
  async update(id: string, updateCompany: CreateCompanyDto, user) {
    return await this.company
      .updateOne({ _id: id, owner: user.uid }, updateCompany)
      .exec();
  }
  async delete(id: string) {
    return await this.company.deleteOne({ _id: id }).exec();
  }
}
