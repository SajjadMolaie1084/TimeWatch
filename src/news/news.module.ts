import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsSchema } from '../news/model/news.model';;
import { NotificationsModule } from '../notifications/notifications.module';
import { CompanyUserModule } from '../companyUser/companyUser.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'News', schema: NewsSchema }]),
    NotificationsModule
    ],
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule {}
