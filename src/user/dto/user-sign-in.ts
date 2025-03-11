import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class SignInUserDto {
    @ApiProperty({
        example: 'John Doe',
    })
    @IsString()
    fullname: string;

    @ApiProperty({
        example: '+998901234567',
    })
    @IsString()
    phone: string;

    @ApiProperty({
        example: 'admin@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'admin@example.com',
    })
    @IsEmail()
    image_url: string;

    @ApiProperty({
        example: 'strong_password',
    })
    @IsString()
    password: string;

    @ApiProperty({
        example: 'strong_password',
    })
    @IsString()
    confirm_password: string

}
