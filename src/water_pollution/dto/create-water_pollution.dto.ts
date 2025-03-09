import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateWaterPollutionDto {
    @ApiProperty({
        example: 1,
    })
    @IsInt()
    @IsNotEmpty()
    districtId: number;

    @ApiProperty({
        example: 'moderate',
    })
    @IsString()
    @IsNotEmpty()
    pollution_leavel: string;

    @ApiProperty({
        example: 'Lead, Mercury',
    })
    @IsString()
    @IsNotEmpty()
    pollutions: string;

    @ApiProperty({
        example: '2025-03-09',
    })
    @IsDateString()
    @IsNotEmpty()
    date: Date;
}
