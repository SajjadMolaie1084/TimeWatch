import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'The name of Company',
    example: 'Facebook',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: String;

  @ApiProperty({
    description: 'The phone number of Company',
    example: '09020000000',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsPhoneNumber('IR')
  phoneNumber: String;
}

export class SendInviteDto {
  @ApiProperty({
    description: 'The phone number of User',
    example: '09020000000',
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  @IsPhoneNumber('IR')
  userPhoneNumber: String;
}
