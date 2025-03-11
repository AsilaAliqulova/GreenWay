import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DistrictService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createDistrictDto: CreateDistrictDto) {
    try {
      return await this.prismaService.district.create({ data: { ...createDistrictDto } });
    } catch (error) {
      console.log("DistrictService create:", error);

      throw new InternalServerErrorException('Failed to create district');
    }
  }

  async findAll() {
    return await this.prismaService.district.findMany();

  }

  async findOne(id: number) {
    const district = await this.prismaService.district.findUnique({
      where: { id },
    });

    if (!district) {
      throw new NotFoundException('district not found');
    }

    return district;

  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    try {
      await this.findOne(id);
      return await this.prismaService.district.update({ where: { id }, data: { ...updateDistrictDto } });
    } catch (error) {
      console.log("districtService update:", error);

      throw new InternalServerErrorException('Failed to update district');
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prismaService.district.delete({ where: { id } });
  }
}
