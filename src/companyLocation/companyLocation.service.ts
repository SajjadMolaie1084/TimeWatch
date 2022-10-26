import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyLocation } from 'src/models/companyLocation.model';
import { companyLocationDto } from 'src/validation';

@Injectable()
export class CompanyLocationService {
  constructor(
    @InjectModel('CompanyLocation') private CompanyLocation: Model<CompanyLocation>
  ) { }
  async create(dto: companyLocationDto): Promise<CompanyLocation> {
    if (await this.CompanyLocation.exists({ name: dto.name,company: dto.company}).exec()) {
      throw new HttpException('CompanyLocation already exists', HttpStatus.CONFLICT)
    }
    else {
      return await this.CompanyLocation.create(dto);
    }

  }
  async findAll() {
    return await this.CompanyLocation.find().exec();
  }
  async findOne(id: string) {
    return await this.CompanyLocation.findOne({ _id:id }).exec();
  }
  async findByCompany(id) {
    return await this.CompanyLocation.find({company:id}).exec();
  }
  async update(id: string, updateCompanyLocation: companyLocationDto) {
    return await this.CompanyLocation.updateOne({ _id: id }, updateCompanyLocation).exec()
  }
  async delete(id: string) {
    return await this.CompanyLocation.deleteOne({ _id: id }).exec()
  }
}
