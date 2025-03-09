import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SoilPollutionService } from './soil_pollution.service';
import { CreateSoilPollutionDto } from './dto/create-soil_pollution.dto';
import { UpdateSoilPollutionDto } from './dto/update-soil_pollution.dto';

@Controller('soil-pollution')
export class SoilPollutionController {
  constructor(private readonly soilPollutionService: SoilPollutionService) {}

  @Post()
  create(@Body() createSoilPollutionDto: CreateSoilPollutionDto) {
    return this.soilPollutionService.create(createSoilPollutionDto);
  }

  @Get()
  findAll() {
    return this.soilPollutionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.soilPollutionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSoilPollutionDto: UpdateSoilPollutionDto) {
    return this.soilPollutionService.update(+id, updateSoilPollutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.soilPollutionService.remove(+id);
  }
}
