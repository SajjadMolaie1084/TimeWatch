import { Module, Global } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { InviteRepository } from './invite.repository';
import { InviteSchema } from 'src/models/invite.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserStrategy } from 'src/strategy/user.strategy';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Invite', schema: InviteSchema }]),
  ],
  providers: [InviteService, InviteRepository, UserStrategy],
  controllers: [InviteController],
  exports: [InviteRepository],
})
export class InviteModule {}
