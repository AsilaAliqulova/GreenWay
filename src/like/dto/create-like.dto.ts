import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateLikeDto {
  @ApiProperty({ description: 'ID of the user who liked the eco report', example: 1 })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'ID of the eco report being liked', example: 10 })
  @IsInt()
  @IsNotEmpty()
  ecoReportId: number;
}


