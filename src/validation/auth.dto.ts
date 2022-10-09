import { IsNotEmpty, IsPhoneNumber, IsNumberString } from 'class-validator';

export class SendOtpDto {
  @IsNotEmpty()
  @IsPhoneNumber('IR')
  phoneNumber: String;

  @IsNotEmpty()
  @IsNumberString()
  otp: String;
}
