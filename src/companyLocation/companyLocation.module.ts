import { Global, Module } from '@nestjs/common';
import { CompanyLocationService } from './companyLocation.service';
import { CompanyLocationController } from './companyLocation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyLocationSchema } from 'src/models/companyLocation.model';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CompanyLocation', schema: CompanyLocationSchema }]),
  ],
  providers: [CompanyLocationService],
  controllers: [CompanyLocationController],
})
export class CompanyLocationModule {}
