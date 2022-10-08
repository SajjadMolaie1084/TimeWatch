import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'The first name of user',
    example: 'sajad',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  firstName: String;

  @ApiProperty({
    description: 'The last name of user',
    example: 'molaie',
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

export class FindByPhoneDto {
  @IsNotEmpty()
  @IsPhoneNumber('IR')
  phoneNumber: String;
}
