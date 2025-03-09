import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateDistrictDto {
    @ApiProperty({
        example: 'Toshkent tumani',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 1,
    })
    @IsInt()
    @IsNotEmpty()
    regionId: number;
}

