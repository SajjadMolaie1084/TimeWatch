import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from 'src/company/model/company.model';
import { CreateCompanyDto } from './dto/company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('Company') private company: Model<Company>
  ) { }
  async create(dto: CreateCompanyDto): Promise<Company> {
    if (await this.company.exists({ name: dto.name }).exec()) {
      throw new HttpException('Company already exists', HttpStatus.CONFLICT)
    }
    else {
      return await this.company.create(dto);
    }
  }
  async findAll() {
    return await this.company.find().exec();
  }
  async findOne(id: string) {
    return await this.company.findOne({ _id:id }).exec();
  }
  async update(id: string, updateCompany: CreateCompanyDto) {
    return await this.company.updateOne({ _id: id }, updateCompany).exec()
  }
  async delete(id: string) {
    return await this.company.deleteOne({ _id: id }).exec()
  }
}
