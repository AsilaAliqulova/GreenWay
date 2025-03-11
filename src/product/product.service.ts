import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prismaService.product.create({ data: { ...createProductDto } });
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
