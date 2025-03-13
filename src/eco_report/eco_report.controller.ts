import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EcoReportService } from './eco_report.service';
import { CreateEcoReportDto } from './dto/create-eco_report.dto';
import { UpdateEcoReportDto } from './dto/update-eco_report.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/role.guard';
import { Roles } from '../decorators/roles-auth.decorator';

@Controller('eco-report')
export class EcoReportController {
  constructor(private readonly ecoReportService: EcoReportService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Post()
  create(@Body() createEcoReportDto: CreateEcoReportDto) {
    return this.ecoReportService.create(createEcoReportDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.ecoReportService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ecoReportService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEcoReportDto: UpdateEcoReportDto) {
    return this.ecoReportService.update(+id, updateEcoReportDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ecoReportService.remove(+id);
  }
}
