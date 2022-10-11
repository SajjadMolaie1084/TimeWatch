import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/user.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    AuthModule,
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserRepository],
})
export class UserModule {}
