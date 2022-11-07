import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Version } from '../version/model/version.model';
import { VersionDto } from './dto/version.dto';

@Injectable()
export class VersionService {
  constructor(
    @InjectModel('Version') private version: Model<Version>
  ) { }
  async create(dto: VersionDto, user, filename, filepath){
    await this.version.deleteMany({});
    var _version= await this.version.create({
      name: dto.name,
      filename: filename,
      filepath: filepath
    });
    return {"name":dto.name}
  }
  async findAll() {
    return await this.version.find({},{name:1}).exec();
  }
  async findOne(id: string) {
    
      return await this.version.findOne({ _id: id });
    

  }
  // async update(id: string, updateVersion: VersionDto) {
  //   return await this.version.updateOne({ _id: id }, updateVersion).exec()
  // }
  // async delete(id: string) {
  //   return await this.version.deleteOne({ _id: id }).exec()
  // }
}
