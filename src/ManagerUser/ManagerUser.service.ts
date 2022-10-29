import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ManagerUser } from './model/managerUser.model';
import { managerUserDto } from './dto/ManagerUser.dto';

@Injectable()
export class ManagerUserService {
  constructor(
    @InjectModel('ManagerUser') private ManagerUser: Model<ManagerUser>
  ) { }
  async create(dto: managerUserDto): Promise<ManagerUser> {
    if (await this.ManagerUser.exists({ user: dto.user,manager: dto.manager}).exec()) {
      throw new HttpException('ManagerUser already exists', HttpStatus.CONFLICT)
    }
    else {
      return await this.ManagerUser.create(dto);
    }

  }
  async findAll(uid: String) {
    return await this.ManagerUser.find({user:uid}).populate('manager').exec();
  }
  async findOne(id: string) {
    return await this.ManagerUser.findOne({ _id:id }).exec();
  }
  async update(id: string, updateManagerUser: managerUserDto) {
    return await this.ManagerUser.updateOne({ _id: id }, updateManagerUser).exec()
  }
  async delete(id: string) {
    return await this.ManagerUser.deleteOne({ _id: id }).exec()
  }
}
