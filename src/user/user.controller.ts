import { Body, Controller, Post, Headers, UseGuards,Get,Delete,Put,Param,Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto, SignUpDto, VerifyDto,fcmDto } from '../validation';
import { UserService } from './user.service';
import {JwtAuthGuard} from "../auth/jwt-auth.guard"
@ApiTags('User')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private UserService: UserService) {}

  @Post('updateFCM')
  updateFCM(@Req() req,@Body() fcmDto ) {
    return this.UserService.updateFCM(req.user.uid,fcmDto);
  }
  @Post()
  create(@Body() dto: SignUpDto ) {
    return this.UserService.create(dto);
  }
  @Get()
  findAll() {
    return this.UserService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.UserService.findOne(id);
  }
  @Get(':id')
  findByCompany(@Param('cid') id: string) {
    return this.UserService.findByCompany(id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() user: SignUpDto) {
    return this.UserService.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.UserService.delete(id);
  }
}
