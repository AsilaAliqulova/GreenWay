import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateChallengeDto {
  @ApiProperty({  example: 'Clean the City' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({example: 'A community challenge to clean the city streets.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'https://example.com/challenge-image.jpg' })
  @IsNotEmpty()
  image_url: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  organizationId: number;

  @ApiProperty({ example: '2025-07-01' })
  @IsNotEmpty()
  deadline: string;
}
