import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WaterPollutionService } from './water_pollution.service';
import { CreateWaterPollutionDto } from './dto/create-water_pollution.dto';
import { UpdateWaterPollutionDto } from './dto/update-water_pollution.dto';

@Controller('water-pollution')
export class WaterPollutionController {
  constructor(private readonly waterPollutionService: WaterPollutionService) {}

  @Post()
  create(@Body() createWaterPollutionDto: CreateWaterPollutionDto) {
    return this.waterPollutionService.create(createWaterPollutionDto);
  }

  @Get()
  findAll() {
    return this.waterPollutionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.waterPollutionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWaterPollutionDto: UpdateWaterPollutionDto) {
    return this.waterPollutionService.update(+id, updateWaterPollutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.waterPollutionService.remove(+id);
  }
}
