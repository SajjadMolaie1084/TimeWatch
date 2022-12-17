import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectModel } from '@nestjs/mongoose';
import { News } from '../news/model/news.model';
import { Model } from 'mongoose';
import { NotificationsService } from '../notifications/notifications.service';
import { CompanyUserService } from '../companyUser/companyUser.service';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel('News') private news: Model<News>,
    private companyUserService: CompanyUserService,
    private notificationsService: NotificationsService
  ) { }
  async create(createNewsDto: CreateNewsDto, userx: any) {
    createNewsDto["date"] = Date.now();
    createNewsDto["user"] = userx.uid;
    var cUsers = await this.companyUserService.findUser(createNewsDto.company);
    var ids = [];
    for (let index = 0; index < cUsers.length; index++) {
      const cu = cUsers[index];
      if (createNewsDto.targetUser) {
        if (cu.user && cu.user._id.toString() == createNewsDto.targetUser) {
          ids.push(cu.user.fcm);
        }
      } else if (cu.user && cu.user.fcm) {
        ids.push(cu.user.fcm);
      }
    }
    if (ids.length > 0) {
      this.notificationsService.send(ids, createNewsDto.text, "خبر", "")
    }
    return this.news.create(createNewsDto);
  }

  findAll(cid: String) {
    return this.news.find({ company: cid, targetUser: null }).lean().populate('company', ["_id", "name"]).populate('user', ["_id", "firstName", "lastName"]).exec();
  }

  findOne(id: String) {
    return this.news.find({ _id: id }).lean().populate('company', ["_id", "name"]).populate('user', ["_id", "firstName", "lastName"]).exec();
  }

  update(id: String, updateNewsDto: UpdateNewsDto) {
    return this.news.updateOne({ _id: id }, updateNewsDto).exec()
  }

  remove(id: String) {
    return this.news.deleteOne({ _id: id }).exec()
  }
}
