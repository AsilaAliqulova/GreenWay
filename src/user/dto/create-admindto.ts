import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

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
    phone: string;

    @ApiProperty({
        example: 'admin@example.com',
    })
    email: string;

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
