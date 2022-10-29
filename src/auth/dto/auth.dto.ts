import {
  IsNotEmpty,
  IsPhoneNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class SendOtpDto {
  @IsNotEmpty()
  @IsPhoneNumber('IR')
  phoneNumber: String;

  @IsNotEmpty()
  @IsNumberString()
  otp: String;
}

export class sendInviteMessageDto {
  @IsNotEmpty()
  @IsPhoneNumber('IR')
  phoneNumber: String;

  @IsNotEmpty()
  @IsString()
  companyName: String;

  @IsNotEmpty()
  @IsString()
  link: String;
}
