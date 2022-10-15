import { Body, Controller, Post, Headers, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto, SignUpDto, VerifyDto } from '../validation';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

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
    return this.UserService.signUp(dto);
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
    return this.UserService.signIn(dto);
  }

  @ApiOperation({
    summary: 'Check user otp and login',
    description: 'Check user otp and return access_token',
  })
  @ApiResponse({
    status: 200,
    description: 'Otp is correct and return access_token',
  })
  @ApiResponse({
    status: 400,
    description: 'Error in sending data',
  })
  @ApiResponse({
    status: 422,
    description: 'Invalid otp',
  })
  @ApiResponse({
    status: 404,
    description: 'User no found',
  })
  @Post('verify')
  verify(@Body() dto: VerifyDto) {
    return this.UserService.verify(dto);
  }

  // @UseGuards(AuthGuard('employee'))
  @Post('enter')
  enter(@Headers() headers) {
    return this.UserService.addEnter(headers);
  }

  // @UseGuards(AuthGuard('employee'))
  @Post('exit')
  exit(@Headers() headers) {
    return this.UserService.addExit(headers);
  }
}
