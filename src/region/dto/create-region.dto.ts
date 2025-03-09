import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRegionDto {
    @ApiProperty({
        example: 'Mahsulot nomi',
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}
