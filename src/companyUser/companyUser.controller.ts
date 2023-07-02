import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { companyUserDto } from '../validation';
import { CompanyUserService } from './companyUser.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('CompanyUser')
@Controller('companyUser')
@UseGuards(JwtAuthGuard)
export class CompanyUserController {
  constructor(private CompanyUserService: CompanyUserService) {}
  @ApiOperation({
    summary: 'Create new CompanyUser',
  })
  @ApiResponse({
    status: 201,
    description: 'CompanyUser created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Error in sending data',
  })
  @ApiResponse({
    status: 409,
    description: 'CompanyUser already exists',
  })
  @Post()
  create(@Body() dto: companyUserDto, @Headers() headers) {
    return this.CompanyUserService.create(dto);
  }
  @Get()
  findAll(@Request() req) {
    return this.CompanyUserService.findAll(req.user.uid);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.CompanyUserService.findOne(id);
  }

  @Get('/company/:companyId')
  findUser(@Param('companyId') companyId: String) {
    return this.CompanyUserService.findUser(companyId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: companyUserDto) {
    return this.CompanyUserService.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.CompanyUserService.delete(id);
  }
}
