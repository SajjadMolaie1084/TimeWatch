import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCompanyDto} from 'src/validation';
import { CompanyService } from './company.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Company')
@Controller('company')
@UseGuards(JwtAuthGuard)
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
 
  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.CompanyService.create(dto);
  }
  @Get()
  findAll() {
    return this.CompanyService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.CompanyService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: CreateCompanyDto) {
    return this.CompanyService.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
  // @Post('location')
  // locationAdd(@Body() dto: LocationDto, @Headers() headers) {
  //   return this.CompanyService.addLocation(dto, headers);
  // }
  // @ApiOperation({
  //   summary: 'Send invite for user',
  // })
  // @ApiResponse({
  //   status: 201,
  //   description: 'Invite send successfully',
  // })
  // @ApiResponse({
  //   status: 400,
  //   description: 'Error in sending data',
  // })
  // @ApiResponse({
  //   status: 404,
  //   description: 'User not found',
  // })
  // @ApiResponse({
  //   status: 409,
  //   description: 'Invite already sended',
  // })
  // // @UseGuards(AuthGuard('company'))
  // @Post('sendInvite')
  // sendInvite(@Body() dto: SendInviteDto, @Headers() headers) {
  //   return this.CompanyService.sendInvite(dto, headers);
  // }

  // @UseGuards(LocalAuthGuard)
  // @Get('logs')
  // logs(@Headers() headers) {
  //   return this.CompanyService.enterAndExitLogs(headers);
  // }

  // @UseGuards(LocalAuthGuard)
  // @Get('logs/:userId')
  // userLogs(@Headers() headers, @Param() param) {
  //   return this.CompanyService.enterAndExitUserLogs(headers, param);
  // }
}
