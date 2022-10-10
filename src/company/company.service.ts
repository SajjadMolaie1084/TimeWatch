import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Company } from 'src/models/company.model';
import { CreateCompanyDto } from 'src/validation';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService {
  constructor(
    private CompanyRepository: CompanyRepository,
    private AuthService: AuthService,
  ) {}

  async create(dto: CreateCompanyDto, headers): Promise<Company> {
    // decode token
    const authorization = headers.authorization;
    const token = authorization.replace('Bearer ', '');
    const data = await this.AuthService.decodeJwt(token);

    // try to find user companies
    const findCompany = await this.CompanyRepository.myCompany(data.sub);

    // if user have company throw error
    if (findCompany !== null)
      throw new HttpException('Company already exists', HttpStatus.CONFLICT);

    // create company
    const company = await this.CompanyRepository.create(dto, data.sub);

    // return company
    return company;
  }
}
