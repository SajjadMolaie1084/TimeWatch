import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'The first name of user',
    example: 'Mark',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  firstName: String;

  @ApiProperty({
    description: 'The last name of user',
    example: 'Zuckerberg',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  lastName: String;

  @ApiProperty({
    description: 'The Phone Number of user',
    example: '09020000000',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsPhoneNumber('IR')
  phoneNumber: String;
}

export class SignInDto {
  @ApiProperty({
    description: 'The Phone Number of user',
    example: '09020000000',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsPhoneNumber('IR')
  phoneNumber: String;
}

export class VerifyDto {
  @ApiProperty({
    description: 'The Phone Number of user',
    example: '09020000000',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsPhoneNumber('IR')
  phoneNumber: String;

  @ApiProperty({
    description: 'The Otp',
    example: '1234',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsNumberString()
  otp: string;
}

export class FindByPhoneDto {
  @IsNotEmpty()
  @IsPhoneNumber('IR')
  phoneNumber: String;
}
