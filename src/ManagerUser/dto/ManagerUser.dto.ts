import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';


export class managerUserDto {
  @IsNotEmpty()
  user: String;

  @IsNotEmpty()
  manager: String;

}

