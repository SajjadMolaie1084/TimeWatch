import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { jwtStrategy } from './jwt.strategy';


@Global()
@Module({
  imports: [
    JwtModule.register({}),
    UserModule
  ],
  providers: [AuthService,jwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
