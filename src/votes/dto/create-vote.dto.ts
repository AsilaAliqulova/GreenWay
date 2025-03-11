import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateVoteDto {
    @ApiProperty({ example: 'Environmental Protection Bill' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'A vote on the new environmental protection regulations.' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: '2025-06-30' })
    @IsString()
    @IsNotEmpty()
    endDate: string;

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsNotEmpty()
    organizationId: number;
}


