import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { JwtCreatorGuard } from '../guards/jwt-creator.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @UseGuards(JwtAuthGuard, JwtCreatorGuard)
  @UseInterceptors(FileInterceptor("image_url"))
  create(@Body() createProductDto: CreateProductDto, @UploadedFile() image_url: Express.Multer.File) {
    return this.productService.create(createProductDto, image_url);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)

  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, JwtCreatorGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, JwtCreatorGuard)
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
