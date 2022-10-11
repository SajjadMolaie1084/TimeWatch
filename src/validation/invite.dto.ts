import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateInviteDto {
  @IsNotEmpty()
  @IsString()
  company: String;

  @IsNotEmpty()
  @IsPhoneNumber('IR')
  userPhoneNumber: String;

  @IsNotEmpty()
  @IsString()
  link: String;
}

export class FindInviteDto {
  @IsNotEmpty()
  @IsString()
  company: String;

  @IsNotEmpty()
  @IsPhoneNumber('IR')
  userPhoneNumber: String;
}
