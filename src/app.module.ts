import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { EnterExitModule } from './enterExit/enterExit.module';
import { CompanyModule } from './company/company.module';
import { CompanyLocationModule } from './companyLocation/companyLocation.module';
import { ManagerUserModule } from './ManagerUser/ManagerUser.module';
import { CompanyUserModule } from './companyUser/companyUser.module';
import { RequestModule } from './request/request.module';
import { VersionModule } from './version/version.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    CompanyModule,
    CompanyLocationModule,
    CompanyUserModule,
    EnterExitModule,
    RequestModule,
    ManagerUserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    VersionModule,
  ],
  controllers: [AppController] 
})
export class AppModule { }
