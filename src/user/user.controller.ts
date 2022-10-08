import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from '../validation';
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
}
