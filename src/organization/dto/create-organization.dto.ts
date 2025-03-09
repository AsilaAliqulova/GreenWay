
import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateOrganizationDto {
    @ApiProperty({ example: 'GreenWay Foundation' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'An NGO focused on environmental conservation.' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({  example: '+998991234567' })
    @IsString()
    phone: string;

    @ApiProperty({  example: 'contact@greenway.org' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'https://greenway.org' })
    @IsOptional()
    website?: string|null

    @ApiProperty({  example: '{"facebook": "https://fb.com/greenway", "twitter": "https://twitter.com/greenway"}' })
    @IsString()
    @IsOptional()
    socials?: string|null
}

