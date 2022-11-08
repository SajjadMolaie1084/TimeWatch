import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';


export class companydateDto {
  @IsNotEmpty()
  company: string;
  @IsNotEmpty()
  date: number;
}