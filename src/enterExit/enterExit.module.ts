import { Global, Module } from '@nestjs/common';
import { EnterExitService } from './enterExit.service';
import { EnterExitController } from './enterExit.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EnterExitSchema } from '../models/enterExit.model';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'EnterExit', schema: EnterExitSchema }]),
  ],
  providers: [EnterExitService],
  controllers: [EnterExitController],
})
export class EnterExitModule {}
