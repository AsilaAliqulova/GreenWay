
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

    @ApiProperty({ description: 'Phone number of the organization', example: '+998991234567' })
    @IsString()
    phone: string;

    @ApiProperty({ description: 'Email address of the organization', example: 'contact@greenway.org' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Website URL of the organization', example: 'https://greenway.org' })
    @IsOptional()
    website?: string|null

    @ApiProperty({ description: 'Social media links in JSON format', example: '{"facebook": "https://fb.com/greenway", "twitter": "https://twitter.com/greenway"}' })
    @IsString()
    @IsOptional()
    socials?: string|null
}

