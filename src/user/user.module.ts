import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/user.model';
import { EnterExitSchema } from 'src/models/enterExit.model';
import { EmployeeStrategy } from 'src/strategy/employee.strategy';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'EnterExit', schema: EnterExitSchema }]),
  ],
  providers: [UserService, UserRepository, EmployeeStrategy],
  controllers: [UserController],
  exports: [UserRepository],
})
export class UserModule {}
