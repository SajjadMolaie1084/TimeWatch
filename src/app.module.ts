import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    CompanyModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
