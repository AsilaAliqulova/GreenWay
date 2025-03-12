import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Matches } from 'class-validator';

export class SignInAdminDto {

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

