import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateWaterPollutionDto } from './dto/create-water_pollution.dto';
import { UpdateWaterPollutionDto } from './dto/update-water_pollution.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WaterPollutionService {
  constructor(private readonly prismaService: PrismaService) { }

 async create(createWaterPollutionDto: CreateWaterPollutionDto) {
  try {
    return await this.prismaService.waterPollution.create({ data: { ...createWaterPollutionDto } });
  } catch (error) {
    console.log("WaterPollutionService create:", error);

    throw new InternalServerErrorException('Failed to create wwater pollution');
  }
  }

  async findAll() {
      return await this.prismaService.waterPollution.findMany({ include: { district: { select: { name: true } } } });
   
  }

  async findOne(id: number) {
      const waterPollution = await this.prismaService.waterPollution.findUnique({
        where: { id },
        include: { district: { select: { name: true } } }
      });

      if (!waterPollution) {
        throw new NotFoundException('waterPollution not found');
      }

      return waterPollution;
   
  }


 async update(id: number, updateWaterPollutionDto: UpdateWaterPollutionDto) {
    try {
      await this.findOne(id);
      return await this.prismaService.waterPollution.update({ where: { id }, data: { ...updateWaterPollutionDto } });
    } catch (error) {
      console.log("waterPollutionsService update:", error);

      throw new InternalServerErrorException('Failed to update waterPollution');
    }
  }

  async remove(id: number) {
      await this.findOne(id);
      return await this.prismaService.waterPollution.delete({ where: { id } });
    
  }
}
