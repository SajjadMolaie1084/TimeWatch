import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EnterExit } from 'src/enterExit/model/enterExit.model';
import { enterExitDto, companydateDto } from 'src/validation';
import { CompanyUserService } from '../companyUser/companyUser.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class EnterExitService {

  constructor(
    @InjectModel('EnterExit') private EnterExit: Model<EnterExit>,
    private companyUserService: CompanyUserService,
    private notificationsService: NotificationsService

  ) { }
  async create(dto: enterExitDto, user): Promise<EnterExit> {
    const date = new Date();
    var admins = await this.companyUserService.findAdmin(dto.company);
    var fcm_ids = [];
    for (let index = 0; index < admins.length; index++) {
      const admin = admins[index];
      if (admin.user.fcm) {
        fcm_ids.push(admin.user.fcm);
      }
    }
    this.notificationsService.send(fcm_ids, user.firstName + "-" + user.lastName, dto.type == "Enter" ? "وارد شد" : "خارج شد", `${date.getHours()}:${date.getMinutes()}`);



    return await this.EnterExit.create({
      company: dto.company,
      location: dto.location,
      user: user.uid,
      date: date,
      type: dto.type
    });
  }
  async findAllbyCompany(cid: string, user) {
    return await this.EnterExit.find({ company: cid, user: user.uid }).exec();
  }
  async findbyLast(cid: string, user: any) {
    var comapny = user.company.filter(p => p.company._id == cid);
    // if (comapny.length > 0 && comapny[0].role == "Admin") {
    //   var allEnterExit=await this.EnterExit.find({ company: cid}).exec();
    //   for (let index = 0; index < array.length; index++) {
    //     const element = array[index];

    //   }
    // }


  }
  async findAllbyUser(uid: string) {
    return await this.EnterExit.find({ user: uid }).exec();
  }
  async findAll(user) {
    // var userCompany=await this.companyUserService.findAll(user.uid);
    return await this.EnterExit.find({ user: user.uid }).populate('company').populate('user').populate('location').exec();

  }
  async findbyDate(dto: companydateDto, user) {
    var comapny = user.company.filter(p => p.company._id == dto.company)
    var date = new Date(dto.date);
    var start = date.setHours(0, 0, 0);
    var end = date.setHours(23, 59, 59);
    var results = [];
    if (comapny.length > 0 && comapny[0].role == "Admin") {
      results = await this.EnterExit.find({ company: dto.company, date: { $gte: start, $lte: end } }).sort("-date").populate('company').populate('user').populate('location').lean().exec();
    }
    else {
      results = await this.EnterExit.find({ company: dto.company, user: user.uid, date: { $gte: date, $lte: end } }).sort("-date").populate('company').populate('user').populate('location').lean().exec();
    }
    var re_result = {};
    for (let index = 0; index < results.length; index++) {
      const element = results[index];
      if (!(element.user._id in re_result)) {
        re_result[element.user._id] = {
          firstName: element.user.firstName,
          lastname: element.user.lastName,
          enter: null,
          exit: null
        }
      }
      if (element.type == "Enter" && re_result[element.user._id].enter == null) {
        re_result[element.user._id].enter = element.date
      }
      if (element.type == "Exit") {
        re_result[element.user._id].exit = element.date
      }
    }
    return Object.values(re_result);
  }
  async findOne(id: string) {
    return await this.EnterExit.findOne({ _id: id }).exec();
  }
  async update(id: string, updateEnterExit: enterExitDto) {
    return await this.EnterExit.updateOne({ _id: id }, updateEnterExit).exec()
  }
  async delete(id: string) {
    return await this.EnterExit.deleteOne({ _id: id }).exec()
  }
}
