import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanySchema } from 'src/models/company.model';
import { AuthModule } from 'src/auth/auth.module';
import { UserStrategy } from 'src/strategy/user.strategy';
import { InviteModule } from 'src/invite/invite.module';
import { UserModule } from 'src/user/user.module';
import { CompanyStrategy } from 'src/strategy/company.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
    AuthModule,
    InviteModule,
    UserModule,
  ],
  providers: [CompanyService, CompanyRepository, UserStrategy, CompanyStrategy],
  controllers: [CompanyController],
  exports: [CompanyRepository],
})
export class CompanyModule {}
