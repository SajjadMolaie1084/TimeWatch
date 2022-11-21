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
import { requestDto} from '../validation';
import { RequestService } from './request.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Request')
@Controller('request')
@UseGuards(JwtAuthGuard)
export class RequestController {
  constructor(private RequestService: RequestService) {}
  @ApiOperation({
    summary: 'Create new Request',
  })
  @ApiResponse({
    status: 201,
    description: 'Request created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Error in sending data',
  })
  @ApiResponse({
    status: 409,
    description: 'Request already exists',
  })
 
  @Post()
  create(@Body() dto: requestDto,@Request() req) {
    return this.RequestService.create(dto,req.user);
  }
  @Get()
  findAll(@Request() req) {
    return this.RequestService.findAll(req.user.uid);
  }
  @Get("/company/:id")
  findAllbyCompany(@Request() req,@Param('id') cid: string) {
    return this.RequestService.findAllByCompany(req.user,cid);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.RequestService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: requestDto) {
    return this.RequestService.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Request() req) {
    return this.RequestService.delete(id, req.user.uid);
  }
}
