import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';


export class requestDto {
  @IsNotEmpty()
  user;
  @IsNotEmpty()
  start: number;
  @IsNotEmpty()
  end: number;
  @IsNotEmpty()
  status: String;
  @IsNotEmpty()
  company;
  @IsNotEmpty()
  type: String;
  @IsNotEmpty()
  description: String;
}

