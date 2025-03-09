import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty({
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({
    example: 2,
  })
  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
