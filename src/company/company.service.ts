import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from 'src/models/company.model';
import { CreateCompanyDto } from 'src/validation';

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
  // async sendInvite(dto: SendInviteDto, headers): Promise<Invite | any> {
  //   // try to find user
  //   const findUser = await this.UserRepository.findByPhone({
  //     phoneNumber: dto.userPhoneNumber,
  //   });

  //   // if user not found throw error
  //   if (findUser === null)
  //     throw new HttpException('User Not found', HttpStatus.NOT_FOUND);

  //   // decode token
  //   const authorization = headers.authorization;
  //   const token = authorization.replace('Bearer ', '');
  //   const data = await this.AuthService.decodeJwt(token);

  //   // company data
  //   const company = await this.CompanyRepository.myCompany(data.sub);

  //   // try to find invite to this user
  //   const findInvite = await this.InviteRepository.findInvite({
  //     company: company.id,
  //     userPhoneNumber: dto.userPhoneNumber,
  //   });

  //   // if find invite throw error
  //   if (findInvite !== null)
  //     return { msg: "Invite already sended" }

  //   // throw new HttpException('Invite already sended', HttpStatus.CONFLICT);

  //   // generate link
  //   const link = await this.AuthService.hash(`user: ${dto.userPhoneNumber} `);

  //   // create invite
  //   const invite = await this.InviteRepository.create({
  //     company: company.id,
  //     userPhoneNumber: dto.userPhoneNumber,
  //     link: link,
  //   });

  //   // send invite message for user
  //   const sendInviteMessage = await this.AuthService.sendInviteMessage({
  //     companyName: company.name,
  //     phoneNumber: dto.userPhoneNumber,
  //     link: invite.link,
  //   });

  //   // return invite data
  //   return invite;
  // }

  // async enterAndExitLogs(headers) {
  //   // decode token
  //   const authorization = headers.authorization;
  //   const token = authorization.replace('Bearer ', '');
  //   const data = await this.AuthService.decodeJwt(token);

  //   // const company = await this.CompanyRepository.myCompany(data.sub);

  //   // const logs = await this.UserRepository.enterAndExitLogs(company.id);

  //   return logs;
  // }

  // async enterAndExitUserLogs(headers, param) {
  //   // decode token
  //   const authorization = headers.authorization;
  //   const token = authorization.replace('Bearer ', '');
  //   const data = await this.AuthService.decodeJwt(token);
  //   var userID = "";
  //   if (param.userId) {
  //     userID = param.userId;
  //   }
  //   else {
  //     userID = data.sub;
  //   }
  //   const user = await this.UserRepository.find(userID);

  //   if (user === null)
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);

  //   const company = await this.CompanyRepository.myCompany(data.sub);

  //   const logs = await this.UserRepository.enterAndExitUserLogs(
  //     null,
  //     userID,
  //   );

  //   return logs;
  // }
}
