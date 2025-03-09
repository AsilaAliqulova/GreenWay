import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateCoinDto {
  @ApiProperty({
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 100,
  })
  @IsInt()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: 'Reward for completing a challenge',
  })
  @IsString()
  @IsNotEmpty()
  reason: string;

}
