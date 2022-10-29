import { Global, Module } from '@nestjs/common';
import { EnterExitService } from './enterExit.service';
import { EnterExitController } from './enterExit.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EnterExitSchema } from './model/enterExit.model';
import { CompanyUserModule } from '../companyUser/companyUser.module';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'EnterExit', schema: EnterExitSchema }]),
    CompanyUserModule
  ],
  providers: [EnterExitService],
  controllers: [EnterExitController],
})
export class EnterExitModule {}
