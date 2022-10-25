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
import { companyLocationDto} from 'src/validation';
import { CompanyLocationService } from './companyLocation.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('CompanyLocation')
@Controller('companyLocation')
@UseGuards(JwtAuthGuard)
export class CompanyLocationController {
  constructor(private CompanyLocationService: CompanyLocationService) {}
  @ApiOperation({
    summary: 'Create new CompanyLocation',
  })
  @ApiResponse({
    status: 201,
    description: 'CompanyLocation created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Error in sending data',
  })
  @ApiResponse({
    status: 409,
    description: 'CompanyLocation already exists',
  })
 
  @Post()
  create(@Body() dto: companyLocationDto, @Headers() headers) {
    return this.CompanyLocationService.create(dto);
  }
  @Get()
  findAll() {
    return this.CompanyLocationService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.CompanyLocationService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: companyLocationDto) {
    return this.CompanyLocationService.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
  // @Post('location')
  // locationAdd(@Body() dto: LocationDto, @Headers() headers) {
  //   return this.CompanyLocationService.addLocation(dto, headers);
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
  // // @UseGuards(AuthGuard('CompanyLocation'))
  // @Post('sendInvite')
  // sendInvite(@Body() dto: SendInviteDto, @Headers() headers) {
  //   return this.CompanyLocationService.sendInvite(dto, headers);
  // }

  // @UseGuards(LocalAuthGuard)
  // @Get('logs')
  // logs(@Headers() headers) {
  //   return this.CompanyLocationService.enterAndExitLogs(headers);
  // }

  // @UseGuards(LocalAuthGuard)
  // @Get('logs/:userId')
  // userLogs(@Headers() headers, @Param() param) {
  //   return this.CompanyLocationService.enterAndExitUserLogs(headers, param);
  // }
}
