import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invite } from 'src/models/invite.model';
import { CreateInviteDto, FindInviteDto } from 'src/validation';

@Injectable()
export class InviteRepository {
  constructor(@InjectModel('Invite') private invite: Model<Invite>) {}

  async create(dto: CreateInviteDto): Promise<Invite> {
    // create new invite
    const invite = await this.invite.create({
      company: dto.company,
      user: dto.userPhoneNumber,
      link: dto.link,
    });

    // return created invite
    return invite;
  }

  async findInvite(dto: FindInviteDto): Promise<Invite | null> {
    // find invite using user and company
    const invites = await this.invite.findOne({
      user: dto.userPhoneNumber,
      company: dto.company,
    });

    // return the invites
    return invites;
  }

  async findInviteByLnik(link: String) {
    const invite = await this.invite.findOne({ link: link });
    return invite;
  }

  async changeInviteStatus(inviteLink: String) {
    const invite = await this.invite.findOneAndUpdate(
      { link: inviteLink },
      { status: 'accept' },
      { new: true },
    );

    return invite;
  }
}
