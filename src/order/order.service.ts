import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createOrderDto: CreateOrderDto) {
    try {
      return await this.prismaService.order.create({ data: { ...createOrderDto } });
    } catch (error) {
      console.log("OrderService create:", error);

      throw new InternalServerErrorException('Failed to create order');
    }
  }


  async findAll() {
    try {
      return await this.prismaService.order.findMany({ include: { user: { select: { fullname: true, email: true } } } });
    } catch (error) {
      console.log("OrderService findAll :", error);
      throw new InternalServerErrorException('Failed to retrieve orders');
    }
  }

  async findOne(id: number) {
    try {
      const order = await this.prismaService.order.findUnique({
        where: { id },
        include: { user: { select: { fullname: true, email: true } } }
      });

      if (!order) {
        throw new NotFoundException('order not found');
      }

      return order;
    } catch (error) {
      console.log("orderService findOne:", error);

      throw new InternalServerErrorException('Failed to retrieve order');
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    try {
      await this.findOne(id);
      return await this.prismaService.order.update({ where: { id }, data: { ...updateOrderDto } });
    } catch (error) {
      console.log("OrderService update:", error);

      throw new InternalServerErrorException('Failed to update order');
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      return await this.prismaService.order.delete({ where: { id } });
    } catch (error) {
      console.log("OrderService remove:", error);

      throw new InternalServerErrorException('Failed to delete ordder');
    }
  }
}
