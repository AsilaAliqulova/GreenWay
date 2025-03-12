import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class SignInUserDto {



    @ApiProperty({
        example: 'admin@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'strong_password',
    })
    @IsString()
    password: string;



}
