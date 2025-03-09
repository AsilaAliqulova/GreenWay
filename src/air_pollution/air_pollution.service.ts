import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAirPollutionDto } from './dto/create-air_pollution.dto';
import { UpdateAirPollutionDto } from './dto/update-air_pollution.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AirPollutionService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createAirPollutionDto: CreateAirPollutionDto) {
    try {
      return await this.prismaService.airPollution.create({ data: { ...createAirPollutionDto } });
    } catch (error) {
      console.log("AirPollutionService create:", error);

      throw new InternalServerErrorException('Failed to create air pollution');
    }
  }

  async findAll() {
    try {
      return await this.prismaService.airPollution.findMany();
    } catch (error) {
      console.log("AirPollutionsService findAll :", error);
      throw new InternalServerErrorException('Failed to retrieve air pollution');
    }
  }

  async findOne(id: number) {
    try {
      const airPollution = await this.prismaService.airPollution.findUnique({
        where: { id },
      });

      if (!airPollution) {
        throw new NotFoundException('airPollution not found');
      }

      return airPollution;
    } catch (error) {
      console.log("airPollutionService findOne:", error);

      throw new InternalServerErrorException('Failed to retrieve air pollution');
    }
  }

  async update(id: number, updateAirPollutionDto: UpdateAirPollutionDto) {
    try {
      await this.findOne(id);
      return await this.prismaService.airPollution.update({ where: { id }, data: { ...updateAirPollutionDto } });
    } catch (error) {
      console.log("airPollutionService update:", error);

      throw new InternalServerErrorException('Failed to update airPollution');
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      return await this.prismaService.airPollution.delete({ where: { id } });
    } catch (error) {
      console.log("airPollutionService remove:", error);

      throw new InternalServerErrorException('Failed to delete airPollution');
    }
  }
}
