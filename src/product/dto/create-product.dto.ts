import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({
        example: 'Mahsulot nomi',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'Mahsulot tavsifi',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
        example: 99,
    })
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty({
        example: 'https://example.com/image.jpg',
    })
    @IsUrl()
    @IsNotEmpty()
    image_url: string;
}
