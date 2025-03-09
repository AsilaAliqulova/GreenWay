
import { ApiProperty } from '@nestjs/swagger';
import {  IsString, IsUrl } from 'class-validator';

export class CreateMediaDto {
  @ApiProperty({  example: 'https://example.com/media.jpg' })
  url: string;

  @ApiProperty({ example: 'image' })
  @IsString()
  type: string;
}

