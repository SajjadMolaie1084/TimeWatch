import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateNewsDto {
    @IsNotEmpty()
    text: string;
    @IsNotEmpty()
    company:String;
    @IsNotEmpty()
    user:String;
}
