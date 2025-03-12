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
    return await this.prismaService.order.findMany({ include: { user: { select: { fullname: true, email: true } } } });

  }

  async findOne(id: number) {
    const order = await this.prismaService.order.findUnique({
      where: { id },
      include: { user: { select: { fullname: true, email: true } } }
    });

    if (!order) {
      throw new NotFoundException('order not found');
    }

    return order;

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
    await this.findOne(id);
    return await this.prismaService.order.delete({ where: { id } });

  }

  async createOrder(userId: number, total_price: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: { balance: true },
    });

    if (!user || user.balance < total_price) {
      throw new Error('Insufficient balance');
    }

    return this.prismaService.$transaction([
      this.prismaService.order.create({
        data: {
          userId: userId,
          total_price: total_price,
          status: 'PENDING',
        },
      }),
      this.prismaService.user.update({
        where: { id: userId },
        data: {
          balance: { decrement: total_price }, 
        },
      }),
    ]);
  }
  
}
