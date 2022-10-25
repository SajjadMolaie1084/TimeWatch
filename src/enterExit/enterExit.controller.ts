import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { enterExitDto} from '../validation';
import { EnterExitService } from './enterExit.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('EnterExit')
@Controller('enterExit')
@UseGuards(JwtAuthGuard)
export class EnterExitController {
  constructor(private EnterExitService: EnterExitService) {}
  @ApiOperation({
    summary: 'Create new EnterExit',
  })
  @ApiResponse({
    status: 201,
    description: 'EnterExit created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Error in sending data',
  })
  @ApiResponse({
    status: 409,
    description: 'EnterExit already exists',
  })

  @Post()
  create(@Body() dto: enterExitDto, @Request() req ) {
    return this.EnterExitService.create(dto,req.user);
  }
  @Get('')
  findAll(@Request() req) {
    return this.EnterExitService.findAll(req.user);
  }
  @Get(':id')
  findAllbyCompany(@Param('id') id: string) {
    return this.EnterExitService.findAllbyCompany(id);
  }
  @Get(':id')
  findAllbyUser(@Param('id') id: string) {
    return this.EnterExitService.findAllbyUser(id);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.EnterExitService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: enterExitDto) {
    return this.EnterExitService.update(id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
