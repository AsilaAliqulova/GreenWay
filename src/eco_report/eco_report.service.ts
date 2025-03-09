import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateEcoReportDto } from './dto/create-eco_report.dto';
import { UpdateEcoReportDto } from './dto/update-eco_report.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EcoReportService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createEcoReportDto: CreateEcoReportDto) {
    try {
      return await this.prismaService.ecoReport.create({ data: { ...createEcoReportDto } });
    } catch (error) {
      console.log("EcoReportService create error:", error);
      throw new InternalServerErrorException('Failed to create eco report');
    }
  }

  async findAll() {
    try {
      return await this.prismaService.ecoReport.findMany({ 
        include: { user: { select: { fullname: true } }, media: true } 
      });
    } catch (error) {
      console.log("EcoReportService findAll error:", error);
      throw new InternalServerErrorException('Failed to retrieve eco reports');
    }
  }

  async findOne(id: number) {
    try {
      const ecoReport = await this.prismaService.ecoReport.findUnique({
        where: { id },
        include: { user: { select: { fullname: true } }, media: true }
      });

      if (!ecoReport) {
        throw new NotFoundException('Eco report not found');
      }

      return ecoReport;
    } catch (error) {
      console.log("EcoReportService findOne error:", error);
      throw new InternalServerErrorException('Failed to retrieve eco report');
    }
  }

  async update(id: number, updateEcoReportDto: UpdateEcoReportDto) {
    try {
      await this.findOne(id);
      return await this.prismaService.ecoReport.update({ where: { id }, data: { ...updateEcoReportDto } });
    } catch (error) {
      console.log("EcoReportService update error:", error);
      throw new InternalServerErrorException('Failed to update eco report');
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      return await this.prismaService.ecoReport.delete({ where: { id } });
    } catch (error) {
      console.log("EcoReportService remove error:", error);
      throw new InternalServerErrorException('Failed to delete eco report');
    }
  }
}
