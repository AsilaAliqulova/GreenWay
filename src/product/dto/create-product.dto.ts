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
    @IsNotEmpty()
    price: string;

    @ApiProperty({
        example: 'https://example.com/image.jpg',
    })
    // @IsNotEmpty()
    image_url: string;
}
