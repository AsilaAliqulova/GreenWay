import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateSoilPollutionDto {
  @ApiProperty({
    example: 101,
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
    example: 'Lead, Arsenic',
  })
  @IsString()
  @IsNotEmpty()
  pollutions: string;

  @ApiProperty({
    example: '2025-03-09',
  })
  @IsString()
  @IsNotEmpty()
  date: string;
}
