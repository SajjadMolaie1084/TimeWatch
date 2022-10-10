import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCompanyDto } from 'src/validation';
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
  @UseGuards(AuthGuard('user'))
  @Post('create')
  create(@Body() dto: CreateCompanyDto, @Headers() headers) {
    return this.CompanyService.create(dto, headers);
  }
}
