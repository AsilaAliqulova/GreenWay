import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateDeliveryDto {
  @ApiProperty({
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty({
    example: '123 Main St, Springfield, USA',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: 'Standard Shipping',
  })
  @IsString()
  @IsNotEmpty()
  delivery_method: string;


  @ApiProperty({
    example: 'In Transit',
  })
  @IsString()
  @IsNotEmpty()
  delivery_status: string;

  @ApiProperty({
    example: '2025-07-21',
  })
  @IsString()
  @IsNotEmpty()
  delivery_date: string;

  @ApiProperty({
    example: 15.99,
  })
  @IsNumber()
  @IsNotEmpty()
  delivery_cost: number;

}
