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
import { managerUserDto} from './dto/ManagerUser.dto';
import { ManagerUserService } from './ManagerUser.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('ManagerUser')
@Controller('managerUser')
@UseGuards(JwtAuthGuard)
export class ManagerUserController {
  constructor(private ManagerUserService: ManagerUserService) {}
  @ApiOperation({
    summary: 'Create new ManagerUser',
  })
  @ApiResponse({
    status: 201,
    description: 'ManagerUser created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Error in sending data',
  })
  @ApiResponse({
    status: 409,
    description: 'ManagerUser already exists',
  })
 
  @Post()
  create(@Body() dto: managerUserDto, @Headers() headers) {
    return this.ManagerUserService.create(dto);
  }
  @Get()
  findAll(@Request() req) {
    return this.ManagerUserService.findAll(req.user.uid);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ManagerUserService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: managerUserDto) {
    return this.ManagerUserService.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
