import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty,  IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({  example: 1 })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({  example: 10 })
  @IsInt()
  @IsNotEmpty()
  ecoReportId: number;

  @ApiProperty({example: 'This is a great report on climate change!' })
  @IsString()
  @IsNotEmpty()
  text: string;
}


