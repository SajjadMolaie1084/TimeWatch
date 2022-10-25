import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';


export class enterExitDto {
  @IsNotEmpty()
  company: string;
  @IsNotEmpty()
  location: string;
  @IsNotEmpty()
  type: string;
 
}

