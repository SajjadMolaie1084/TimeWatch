import { Global, Module } from '@nestjs/common';
import { ManagerUserService } from './ManagerUser.service';
import { ManagerUserController } from './ManagerUser.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagerUserSchema } from './model/managerUser.model';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'ManagerUser', schema: ManagerUserSchema }]),
  ],
  providers: [ManagerUserService],
  controllers: [ManagerUserController],
})
export class ManagerUserModule {}
