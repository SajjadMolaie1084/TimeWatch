import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from './model/request.model';
import { requestDto } from '../validation';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel('Request') private request: Model<Request>
  ) { }
  async create(dto: requestDto): Promise<Request> {
    return await this.request.create(dto);
  }
  async findAll(uid: string) {
    return await this.request.find({ user: uid }).populate('company').populate('user').exec();
  }
  async findOne(id: string) {
    return await this.request.findOne({ _id: id }).populate('company').populate('user').exec();
  }
  async update(id: string, updateRequest: requestDto) {
    return await this.request.updateOne({ _id: id }, updateRequest).exec()
  }
  async delete(id: string) {
    return await this.request.deleteOne({ _id: id }).exec()
  }

}
