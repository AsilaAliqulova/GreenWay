import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Matches } from 'class-validator';

export class CreateAdminDto {


    @ApiProperty({
        example: 'John Doe',
    })
    @IsString()
    fullname: string;

    @ApiProperty({
        example: '+998901234567',
    })
    @IsString()
    @Matches(/^\+?[1-9]\d{1,14}$/)
    phone: string;

    @ApiProperty({
        example: 'admin@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'http://example.com/image.jpg',
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
    readonly confirm_password: string


}
