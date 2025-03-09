import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty,  IsString, } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({  example: 'Climate Change Conference' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'An international conference on climate change and sustainability.' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'https://example.com/event-image.jpg' })
  @IsNotEmpty()
  image_url: string;

  @ApiProperty({example: 1 })
  @IsInt()
  @IsNotEmpty()
  organizationId: number;
}


