import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from './model/request.model';
import { requestDto } from '../validation';
import { NotificationsService } from '../notifications/notifications.service';
import { CompanyUserService } from '../companyUser/companyUser.service';
import { EnterExitService } from '../enterExit/enterExit.service';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel('Request') private request: Model<Request>,
    private companyUserService: CompanyUserService,
    private notificationsService: NotificationsService,
    private enterExitService: EnterExitService

  ) { }
  async create(dto: requestDto, user: any): Promise<Request> {
    var admins = await this.companyUserService.findAdmin(dto.company);
    var fcm_ids = [];
    var reqType = "";
    if (dto.type == "Exit") {
      reqType = "درخواست خروج";
    }
    if (dto.type == "Enter") {
      reqType = "درخواست ورود";
    }
    if (dto.type == "Mission") {
      reqType = "درخواست ماموریت";
    }
    if (dto.type == "Vacation") {
      reqType = "درخواست مرخصی";
    }
    for (let index = 0; index < admins.length; index++) {
      const admin = admins[index];
      if (admin.user.fcm) {
        fcm_ids.push(admin.user.fcm);
      }
    }
    this.notificationsService.send(fcm_ids, user.firstName + "-" + user.lastName, reqType, dto.description);
    dto["lastUpdate"]=Date.now();
    return await this.request.create(dto);
  }
  async findAll(uid: string) {
    return await this.request.find({ user: uid }).populate('company', ["_id", "name"]).populate('user', ["_id", "firstName", "lastName", "fcm"]).exec();
  }
  async findAllByCompany(user, cid) {
    var comapny = user.company.filter(p => p.company._id == cid)
    if (comapny.length > 0 && comapny[0].role == "Admin") {
      var xxx=await this.request.find({ company: cid, status: "Pending" }).populate('company', ["_id", "name"]).populate('user', ["_id", "firstName", "lastName", "fcm"]).lean().exec();
      return await this.request.find({ company: cid, status: "Pending" }).populate('company', ["_id", "name"]).populate('user', ["_id", "firstName", "lastName", "fcm"]).lean().exec();
    }
    else {
      return await this.request.find({ user: user.uid, company: cid }).populate('company', ["_id", "name"]).populate('user', ["_id", "firstName", "lastName", "fcm"]).exec();
    }
  }
  async findOne(id: string) {
    return await this.request.findOne({ _id: id }).populate('company', ["_id", "name"]).populate('user', ["_id", "firstName", "lastName", "fcm"]).exec();
  }
  async update(id: string, updateRequest: requestDto) {
    var moment = require('moment-jalaali')
    
    var request = await this.request.findOne({ _id: id }).populate('company', ["_id", "name"]).populate('user', ["_id", "firstName", "lastName", "fcm"]).exec();
    if (!request) {
      throw new HttpException('Request not found', HttpStatus.NOT_FOUND);
    }
    var reqType = "";
    if (request.type == "Exit") {
      reqType = "درخواست خروج";
    }
    if (request.type == "Enter") {
      reqType = "درخواست ورود";
    }
    if (request.type == "Mission") {
      reqType = "درخواست ماموریت";
    }
    if (request.type == "Vacation") {
      reqType = "درخواست مرخصی";
    }
    var start = new Date(updateRequest.start);
    var start_j=new Intl.DateTimeFormat('fa-IR').format(start);
    var state=""
    if (updateRequest.status == "Accept" && (updateRequest.type=="Enter" || updateRequest.type=="Exit")) {
      
      this.enterExitService.createWithModel({
        company: updateRequest.company,
        location: null,
        user: updateRequest.user,
        date: updateRequest.start,
        type: updateRequest.type
      })
    }
    if (updateRequest.status == "Accept") {
      state="پذیرفته شد";
    }
    if (updateRequest.status == "Reject") {
      state="رد شد";

    }
    if (updateRequest.status == "Pending") {
      state="ویرایش شد";

    }
    this.notificationsService.send([request.user.fcm],`${reqType} شما به تاریخ ${start_j} ${state} شد`, "درخواست", "");
    updateRequest["lastUpdate"]=Date.now();
    return await this.request.updateOne({ _id: id }, updateRequest).exec()
  }
  async delete(id: string, uid: string) {

    return await this.request.deleteOne({ _id: id, user: uid, status: "Pending" }).exec()
  }

}
