import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EcoReportService } from './eco_report.service';
import { CreateEcoReportDto } from './dto/create-eco_report.dto';
import { UpdateEcoReportDto } from './dto/update-eco_report.dto';

@Controller('eco-report')
export class EcoReportController {
  constructor(private readonly ecoReportService: EcoReportService) {}

  @Post()
  create(@Body() createEcoReportDto: CreateEcoReportDto) {
    return this.ecoReportService.create(createEcoReportDto);
  }

  @Get()
  findAll() {
    return this.ecoReportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ecoReportService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEcoReportDto: UpdateEcoReportDto) {
    return this.ecoReportService.update(+id, updateEcoReportDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ecoReportService.remove(+id);
  }
}
