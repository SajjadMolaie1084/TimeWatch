import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';


export class companyUserDto {
  @IsNotEmpty()
  user: String;

  @IsNotEmpty()
  company: String;

  @IsNotEmpty()
  role: String;
}

