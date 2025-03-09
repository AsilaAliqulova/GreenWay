
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateOrderDto {
    @ApiProperty({
        example: 42,
    })
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({
        example: 99,
    })
    @IsNumber()
    @IsNotEmpty()
    total_price: number;

    @ApiProperty({
        example: 'Processing',
    })
    @IsString()
    @IsNotEmpty()
    status: string;

}
