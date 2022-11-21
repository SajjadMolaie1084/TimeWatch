import { Global, Module } from '@nestjs/common';
import { EnterExitService } from './enterExit.service';
import { EnterExitController } from './enterExit.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EnterExitSchema } from './model/enterExit.model';
import { CompanyUserModule } from '../companyUser/companyUser.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'EnterExit', schema: EnterExitSchema }]),
    CompanyUserModule,
    NotificationsModule
  ],
  providers: [EnterExitService],
  controllers: [EnterExitController],
  exports: [EnterExitService]
})
export class EnterExitModule {}
