import { Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectModel } from '@nestjs/mongoose';
import { News } from '../news/model/news.model';
import { Model } from 'mongoose';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel('News') private news: Model<News>
  ) { }
  create(createNewsDto: CreateNewsDto) {
    createNewsDto["date"]=Date.now();
    return this.news.create(createNewsDto);
  }

  findAll(cid: String) {
    return this.news.find({ company: cid }).lean().populate('company').populate('user').exec();
  }

  findOne(id: String) {
    return this.news.find({ _id: id }).lean().populate('company').populate('user').exec();
  }

  update(id: String, updateNewsDto: UpdateNewsDto) {
    return this.news.updateOne({ _id: id }, updateNewsDto).exec()
  }

  remove(id: String) {
    return this.news.deleteOne({ _id: id }).exec()
  }
}
