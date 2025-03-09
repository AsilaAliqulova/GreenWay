import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAirPollutionDto {
  @ApiProperty({
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  districtId: number;

  @ApiProperty({
    example: 'low',
  })
  @IsString()
  @IsNotEmpty()
  pollution_leavel: string;

  @ApiProperty({
    example: 'CO2, NO2',
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
