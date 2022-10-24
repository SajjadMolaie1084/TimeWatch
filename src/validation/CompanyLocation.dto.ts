import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';


export class companyLocationDto {
  @IsNotEmpty()
  lat: Number;

  @IsNotEmpty()
  long: Number;

  @IsNotEmpty()
  radius: Number;

  @IsNotEmpty()
  company: String;

  @IsNotEmpty()
  name: String;
}

