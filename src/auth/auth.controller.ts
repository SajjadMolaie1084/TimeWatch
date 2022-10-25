import { Body, Controller, Post, Headers, UseGuards,Get,Delete,Put,Param,Req } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto, SignUpDto, VerifyDto,fcmDto } from '../validation';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Create a new user And return access_token',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Error in sending data',
  })
  @ApiResponse({
    status: 409,
    description: 'User already exists',
  })
  @Post('signUp')
  signUp(@Body() dto: SignUpDto) {
    return this.AuthService.signUp(dto);
  }

  @ApiOperation({
    summary: 'Send otp for user',
    description: 'Update Otp and Send new otp for user',
  })
  @ApiResponse({
    status: 200,
    description: 'SMS send successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Error in sending data',
  })
  @ApiResponse({
    status: 404,
    description: 'User no found',
  })
  @Post('signIn')
  signIn(@Body() dto: SignInDto) {
    return this.AuthService.signIn(dto);
  }

  @ApiOperation({
    summary: 'Check user otp and login',
    description: 'Check user otp and return access_token',
  })
   @Post('verify')
  verify(@Body() dto: VerifyDto) {
    return this.AuthService.verify(dto);
  }


}
