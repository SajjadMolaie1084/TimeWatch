import { Global, Module } from '@nestjs/common';
import { VersionService } from './version.service';
import { VersionController } from './version.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VersionSchema } from 'src/version/model/version.model';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Version', schema: VersionSchema }]),
  ],
  providers: [VersionService],
  controllers: [VersionController],
})
export class VersionModule {}
