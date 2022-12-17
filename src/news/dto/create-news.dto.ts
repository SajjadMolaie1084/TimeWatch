import { IsNotEmpty, IsPhoneNumber, IsString,IsOptional } from 'class-validator';

export class CreateNewsDto {
    @IsNotEmpty()
    text: string;
    @IsString()
    company:String;
    @IsString()
    @IsOptional()
    targetUser:String;
}
