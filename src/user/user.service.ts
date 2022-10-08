import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { SignUpDto } from '../validation';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private UserRepository: UserRepository,
    private AuthService: AuthService,
  ) {}

  async signUp(dto: SignUpDto): Promise<{ access_token: string }> {
    const findUser = await this.UserRepository.findByPhone({
      phoneNumber: dto.phoneNumber,
    });

    // if user find throw error
    if (findUser !== null)
      throw new HttpException('User Already exists', HttpStatus.CONFLICT);

    // create user using user repository
    const user = await this.UserRepository.create(dto);

    // generate token
    const token = await this.AuthService.generateJwt({
      sub: user.id,
      phoneNumber: user.phoneNumber,
    });

    // return token
    return token;
  }
}
