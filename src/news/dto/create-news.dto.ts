import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateNewsDto {
    @IsNotEmpty()
    text: string;
    @IsString()
    company:String;
    @IsString()
    targetUser:String;
}
