import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateSoilPollutionDto } from './dto/create-soil_pollution.dto';
import { UpdateSoilPollutionDto } from './dto/update-soil_pollution.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SoilPollutionService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createSoilPollutionDto: CreateSoilPollutionDto) {
    try {
      return await this.prismaService.soilPollution.create({ data: { ...createSoilPollutionDto } });
    } catch (error) {
      console.log("SoilPollutionService create:", error);

      throw new InternalServerErrorException('Failed to create soil pollution');
    }
  }

  async findAll() {
    try {
      return await this.prismaService.soilPollution.findMany({ include: { district: { select: { name: true } } } });
    } catch (error) {
      console.log("SoilPollutionService findAll :", error);
      throw new InternalServerErrorException('Failed to retrieve soil pollution');
    }
  }

  async findOne(id: number) {
    try {
      const soilPollution = await this.prismaService.soilPollution.findUnique({
        where: { id },
        include: { district: { select: { name: true } } }
      });

      if (!soilPollution) {
        throw new NotFoundException('soilPollution not found');
      }

      return soilPollution;
    } catch (error) {
      console.log("soilPollutionService findOne:", error);

      throw new InternalServerErrorException('Failed to retrieve soil pollution');
    }
  }


  async update(id: number, updateSoilPollutionDto: UpdateSoilPollutionDto) {
    try {
      await this.findOne(id);
      return await this.prismaService.soilPollution.update({ where: { id }, data: { ...updateSoilPollutionDto } });
    } catch (error) {
      console.log("SoilPollutionService update:", error);

      throw new InternalServerErrorException('Failed to update soil pollution');
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      return await this.prismaService.soilPollution.delete({ where: { id } });
    } catch (error) {
      console.log("SoilPollutionService remove:", error);

      throw new InternalServerErrorException('Failed to delete soil pollution');
    }
  }
}
