import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FileService } from '../file/file.service';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService,
        private readonly fileService: FileService
    
  ) { }

  async create(createProductDto: CreateProductDto, image_url: Express.Multer.File) {
    try {
     if (!image_url) throw new BadRequestException("The file is incorrect or empty");
      
      const fileName = await this.fileService.saveFile(image_url);
      return await this.prismaService.product.create({ data: { ...createProductDto,image_url:fileName } });
    } catch (error) {
      console.log("ProductService create:", error);

      throw new InternalServerErrorException('Failed to create Prudect');
    }
  }

  async findAll() {
    return await this.prismaService.product.findMany();

  }

  async findOne(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('product not found');
    }

    return product;

  }


  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      await this.findOne(id);
      return await this.prismaService.product.update({ where: { id }, data: { ...updateProductDto } });
    } catch (error) {
      console.log("ProductService update:", error);

      throw new InternalServerErrorException('Failed to update product');
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prismaService.product.delete({ where: { id } });

  }
}
