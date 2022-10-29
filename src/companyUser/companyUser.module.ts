import { Global, Module } from '@nestjs/common';
import { CompanyUserService } from './companyUser.service';
import { CompanyUserController } from './companyUser.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyUserSchema } from './model/companyUser.model';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CompanyUser', schema: CompanyUserSchema }]),
  ],
  providers: [CompanyUserService],
  controllers: [CompanyUserController],
  exports: [CompanyUserService]

})
export class CompanyUserModule {}
