import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from 'src/models/company.model';
import { AuthModule } from 'src/auth/auth.module';
import { UserSterategy } from 'src/strategy/user.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
    AuthModule,
  ],
  providers: [CompanyService, CompanyRepository, UserSterategy],
  controllers: [CompanyController],
})
export class CompanyModule {}
