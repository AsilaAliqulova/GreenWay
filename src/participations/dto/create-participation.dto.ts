import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, } from 'class-validator';

export class CreateParticipationDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ example: 5, required: false })
    @IsInt()
    @IsOptional()
    eventId?: number;

    @ApiProperty({ example: 3, required: false })
    @IsInt()
    @IsOptional()
    challengesId?: number;

    @ApiProperty({ example: 'https://example.com/certificate.pdf' })
    @IsNotEmpty()
    certificate_url: string;
}


