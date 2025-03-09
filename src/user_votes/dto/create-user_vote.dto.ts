import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserVoteDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  votesId: number;

  @ApiProperty({ example: 'yes or no' })
  @IsString()
  @IsNotEmpty()
  vote: string;

  @ApiProperty({ example: 'Voting in support of environmental policies' })
  @IsString()
  @IsOptional()
  description?: string;
}

