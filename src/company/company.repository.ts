import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from 'src/models/company.model';
import { CreateCompanyDto } from 'src/validation';

@Injectable()
export class CompanyRepository {
  constructor(@InjectModel('Company') private company: Model<Company>) {}

  async create(dto: CreateCompanyDto, owner: String): Promise<Company> {
    const company = await this.company.create({
      name: dto.name,
      phoneNumber: dto.phoneNumber,
      owner: owner,
    });

    return company;
  }

  async myCompany(userId: String): Promise<Company> {
    const company = await this.company.findOne({ owner: userId });
    return company;
  }
}
