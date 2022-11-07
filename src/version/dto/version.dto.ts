import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class VersionDto {
  @IsNotEmpty()
  @IsString()
  name: String;
}


