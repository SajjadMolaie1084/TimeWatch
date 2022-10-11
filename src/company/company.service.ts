import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { InviteRepository } from 'src/invite/invite.repository';
import { Company } from 'src/models/company.model';
import { CreateCompanyDto, SendInviteDto } from 'src/validation';
import { CompanyRepository } from './company.repository';
import { UserRepository } from '../user/user.repository';
import { Invite } from 'src/models/invite.model';

@Injectable()
export class CompanyService {
  constructor(
    private CompanyRepository: CompanyRepository,
    private AuthService: AuthService,
    private InviteRepository: InviteRepository,
    private UserRepository: UserRepository,
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

  async sendInvite(dto: SendInviteDto, headers): Promise<Invite | any> {
    // try to find user
    const findUser = await this.UserRepository.findByPhone({
      phoneNumber: dto.userPhoneNumber,
    });

    // if user not found throw error
    if (findUser === null)
      throw new HttpException('User Not found', HttpStatus.NOT_FOUND);

    // decode token
    const authorization = headers.authorization;
    const token = authorization.replace('Bearer ', '');
    const data = await this.AuthService.decodeJwt(token);

    // company data
    const company = await this.CompanyRepository.myCompany(data.sub);

    // try to find invite to this user
    const findInvite = await this.InviteRepository.findInvite({
      company: company.id,
      userPhoneNumber: dto.userPhoneNumber,
    });

    // if find invite throw error
    if (findInvite !== null)
      throw new HttpException('Invite already sended', HttpStatus.CONFLICT);

    // generate link
    const link = await this.AuthService.hash(`user: ${dto.userPhoneNumber} `);

    // create invite
    const invite = await this.InviteRepository.create({
      company: company.id,
      userPhoneNumber: dto.userPhoneNumber,
      link: link,
    });

    // send invite message for user
    const sendInviteMessage = await this.AuthService.sendInviteMessage({
      companyName: company.name,
      phoneNumber: dto.userPhoneNumber,
      link: invite.link,
    });

    // return invite data
    return invite;
  }
}
