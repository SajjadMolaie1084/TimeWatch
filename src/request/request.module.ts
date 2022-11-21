import { Global, Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestSchema } from './model/request.model';
import { NotificationsModule } from '../notifications/notifications.module';
import { CompanyUserModule } from '../companyUser/companyUser.module';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Request', schema: RequestSchema }]),
    CompanyUserModule,
    NotificationsModule
  ],
  providers: [RequestService],
  controllers: [RequestController],
})
export class RequestModule {}
