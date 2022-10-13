import { Global, Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';
import { UserStrategy } from 'src/strategy/user.strategy';
import { CompanyStrategy } from 'src/strategy/company.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from 'src/models/company.model';
import { ThrottlerModule } from '@nestjs/throttler';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
  ],
  providers: [CompanyService, CompanyRepository, UserStrategy, CompanyStrategy],
  controllers: [CompanyController],
  exports: [CompanyRepository],
})
export class CompanyModule {}
