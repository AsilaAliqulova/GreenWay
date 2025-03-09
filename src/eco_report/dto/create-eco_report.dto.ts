import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty,  IsString } from 'class-validator';

export class CreateEcoReportDto {
  @ApiProperty({ example: 'Deforestation Impact' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({example: 'This report covers the impact of deforestation on wildlife.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({example: 1 })
  @IsInt()
  @IsNotEmpty()
  mediaId: number;

  @ApiProperty({example: 1 })
  @IsInt()
  @IsNotEmpty()
  userId: number;
}


