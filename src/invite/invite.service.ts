import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserRepository } from 'src/user/user.repository';
import { InviteRepository } from './invite.repository';

@Injectable()
export class InviteService {
  constructor(
    private AuthService: AuthService,
    private InviteRepository: InviteRepository,
    private UserRepository: UserRepository,
  ) {}

  async accept(params, headers) {
    // try to find invite link in database
    const invite = await this.InviteRepository.findInviteByLnik(params.link);

    // if link not found throw error
    if (invite === null)
      throw new HttpException('Invite not found', HttpStatus.NOT_FOUND);

    // check invite status if === 'accept' throw error
    if (invite.status !== 'pending')
      throw new HttpException('Invalid link', HttpStatus.UNPROCESSABLE_ENTITY);

    // decode token
    const authorization = headers.authorization;
    const token = authorization.replace('Bearer ', '');
    const data = await this.AuthService.decodeJwt(token);

    // find user by id
    const user = await this.UserRepository.find(data.sub);

    // if user have company throw error
    // if (user.company !== null)
    //   throw new HttpException(
    //     'The user is already in a Company',
    //     HttpStatus.CONFLICT,
    //   );

    // change invite status from 'pending' to 'accept'
    const changeInviteStatus = await this.InviteRepository.changeInviteStatus(
      params.link,
    );

    // add company to user
    const addCompany = await this.UserRepository.addCompany({
      companyId: invite.company,
      userId: user.id,
    });

    // send success message
    throw new HttpException('Invite accept successfully', HttpStatus.OK);
  }
}
