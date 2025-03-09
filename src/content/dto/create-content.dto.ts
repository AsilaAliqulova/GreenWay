
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, } from 'class-validator';

export class CreateContentDto {
    @ApiProperty({ example: 'Introduction to NestJS' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'This is a sample description' })
    @IsString()
    description: string;

    @ApiProperty({ example: 1 })
    @IsInt()
    mediaId: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    adminId: number;
}


