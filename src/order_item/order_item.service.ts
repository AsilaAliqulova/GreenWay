import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderItemService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createOrderItemDto: CreateOrderItemDto) {
    try {
      return await this.prismaService.orderItems.create({ data: { ...createOrderItemDto } });
    } catch (error) {
      console.log("OrderItemService create:", error);

      throw new InternalServerErrorException('Failed to create order_item');
    }
  }

  async findAll() {
    try {
      return await this.prismaService.orderItems.findMany({ include: { order: { select: { total_price: true, status: true } }, product: { select: { name: true, price: true } } } });
    } catch (error) {
      console.log("OrderItemService findAll :", error);
      throw new InternalServerErrorException('Failed to retrieve order items');
    }
  }

  async findOne(id: number) {
    try {
      const orderItems = await this.prismaService.orderItems.findUnique({
        where: { id },
        include: { order: { select: { total_price: true, status: true } }, product: { select: { name: true, price: true } } }
      });

      if (!orderItems) {
        throw new NotFoundException('orderItems not found');
      }

      return orderItems;
    } catch (error) {
      console.log("orderItemsService findOne:", error);

      throw new InternalServerErrorException('Failed to retrieve orderItems');
    }
  }

 async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    try {
      await this.findOne(id);
      return await this.prismaService.orderItems.update({ where: { id }, data: { ...updateOrderItemDto } });
    } catch (error) {
      console.log("orderItemsService update:", error);

      throw new InternalServerErrorException('Failed to update order item');
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      return await this.prismaService.orderItems.delete({ where: { id } });
    } catch (error) {
      console.log("orderItemService remove:", error);

      throw new InternalServerErrorException('Failed to delete order item');
    }
  }
}
