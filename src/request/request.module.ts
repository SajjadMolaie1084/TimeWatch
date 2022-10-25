import { Global, Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestSchema } from '../models/request.model';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Request', schema: RequestSchema }]),
  ],
  providers: [RequestService],
  controllers: [RequestController],
})
export class RequestModule {}
