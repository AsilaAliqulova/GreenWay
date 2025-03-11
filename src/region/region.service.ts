import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createRegionDto: CreateRegionDto) {
    try {
      return await this.prismaService.region.create({ data: { ...createRegionDto } });
    } catch (error) {
      console.log("RegionService create:", error);

      throw new InternalServerErrorException('Failed to create region');
    }
  }

  async findAll() {
    return await this.prismaService.region.findMany({ include: { district: { select: { name: true } } } });

  }

  async findOne(id: number) {
    const region = await this.prismaService.region.findUnique({
      where: { id },
      include: { district: { select: { name: true } } }
    });

    if (!region) {
      throw new NotFoundException('Region not found');
    }

    return region;

  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    try {
      await this.findOne(id);
      return await this.prismaService.region.update({ where: { id }, data: { ...updateRegionDto } });
    } catch (error) {
      console.log("RegionService update:", error);

      throw new InternalServerErrorException('Failed to update region');
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prismaService.region.delete({ where: { id } });

  }
}
