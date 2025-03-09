import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DeliveryService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createDeliveryDto: CreateDeliveryDto) {
    try {
      return await this.prismaService.delivery.create({ data: { ...createDeliveryDto } });
    } catch (error) {
      console.log("DeliveryService create:", error);

      throw new InternalServerErrorException('Failed to create delivery');
    }
  }

  async findAll() {
    try {
      return await this.prismaService.delivery.findMany({ include: { order: true } });
    } catch (error) {
      console.log("DeliveryService findAll :", error);
      throw new InternalServerErrorException('Failed to retrieve delivery');
    }
  }

  async findOne(id: number) {
    try {
      const delivery = await this.prismaService.delivery.findUnique({
        where: { id },
        include: { order: true }
      });

      if (!delivery) {
        throw new NotFoundException('delivery not found');
      }

      return delivery;
    } catch (error) {
      console.log("deliveryService findOne:", error);

      throw new InternalServerErrorException('Failed to retrieve delivery');
    }
  }

  async update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    try {
      await this.findOne(id);
      return await this.prismaService.delivery.update({ where: { id }, data: { ...updateDeliveryDto } });
    } catch (error) {
      console.log("deliveryService update:", error);

      throw new InternalServerErrorException('Failed to update delivery');
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      return await this.prismaService.delivery.delete({ where: { id } });
    } catch (error) {
      console.log("DeliverysService remove:", error);

      throw new InternalServerErrorException('Failed to delete delivery');
    }
  }
}
