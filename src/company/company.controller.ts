import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Request,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCompanyDto} from './dto/company.dto';
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
  create(@Body() dto: CreateCompanyDto,@Request() req) {
    return this.CompanyService.create(dto,req.user);
  }
  @Get()
  findAll(@Request() req) {
    return this.CompanyService.findAll(req.user);
  }
  @Get(':id')
  findOne(@Param('id') id: string,@Request() req) {
    return this.CompanyService.findOne(id,req.user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: CreateCompanyDto,@Request() req) {
    return this.CompanyService.update(id, updateCatDto,req.user);
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
