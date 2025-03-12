import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
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
    email: string;



    @ApiProperty({
        example: 'admin@example.com',
    })
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
