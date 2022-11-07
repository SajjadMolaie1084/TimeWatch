import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Res,
  Request,
  Post,
  Put,
  UseGuards,
  UploadedFile,
  UseInterceptors, 
  StreamableFile,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VersionDto } from './dto/version.dto';
import { VersionService } from './version.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, readFileSync } from 'fs';


@ApiTags('Version')
@Controller('version')
@UseGuards(JwtAuthGuard)
export class VersionController {
  constructor(private VersionService: VersionService) { }
  @ApiOperation({
    summary: 'Create new Version',
  })
  @ApiResponse({
    status: 201,
    description: 'Version created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Error in sending data',
  })
  @ApiResponse({
    status: 409,
    description: 'Version already exists',
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    dest: './upload',
  }))
  create(@Body() dto: VersionDto, @Request() req, @UploadedFile() file: Express.Multer.File) {
    var x = 0;
    return this.VersionService.create(dto, req.user, file.originalname, file.path);
  }
  @Get()
  findAll() {
    return this.VersionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res({ passthrough: true }) res): Promise<StreamableFile> {
    var version = await this.VersionService.findOne(id);
    if (version) {
      const file = createReadStream(version.filepath);
      res.set({
        'Content-Type': 'application/vnd.android.package-archive',
        'Content-Disposition': 'attachment; filename="' + version.filename + '"',
      });
      return new StreamableFile(file);
    }
    else{
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
      
    }

  }



}
