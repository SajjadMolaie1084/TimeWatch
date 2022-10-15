import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { CreateCompanyDto, SendInviteDto } from 'src/validation';
import { CompanyService } from './company.service';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private CompanyService: CompanyService) {}

  @ApiOperation({
    summary: 'Create new Company',
  })
  @ApiResponse({
    status: 201,
    description: 'Company created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Error in sending data',
  })
  @ApiResponse({
    status: 409,
    description: 'Company already exists',
  })
  // @UseGuards(AuthGuard('user'))
  @Post('create')
  create(@Body() dto: CreateCompanyDto, @Headers() headers) {
    return this.CompanyService.create(dto, headers);
  }

  @ApiOperation({
    summary: 'Send invite for user',
  })
  @ApiResponse({
    status: 201,
    description: 'Invite send successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Error in sending data',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Invite already sended',
  })
  // @UseGuards(AuthGuard('company'))
  @Post('sendInvite')
  sendInvite(@Body() dto: SendInviteDto, @Headers() headers) {
    return this.CompanyService.sendInvite(dto, headers);
  }

  // @UseGuards(AuthGuard('company'))
  @Get('logs')
  logs(@Headers() headers) {
    return this.CompanyService.enterAndExitLogs(headers);
  }

  // @UseGuards(AuthGuard('company'))
  @Get('logs/:userId')
  userLogs(@Headers() headers, @Param() param) {
    return this.CompanyService.enterAndExitUserLogs(headers, param);
  }
}
