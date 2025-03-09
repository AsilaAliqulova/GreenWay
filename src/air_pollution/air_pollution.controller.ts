import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AirPollutionService } from './air_pollution.service';
import { CreateAirPollutionDto } from './dto/create-air_pollution.dto';
import { UpdateAirPollutionDto } from './dto/update-air_pollution.dto';

@Controller('air-pollution')
export class AirPollutionController {
  constructor(private readonly airPollutionService: AirPollutionService) {}

  @Post()
  create(@Body() createAirPollutionDto: CreateAirPollutionDto) {
    return this.airPollutionService.create(createAirPollutionDto);
  }

  @Get()
  findAll() {
    return this.airPollutionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.airPollutionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAirPollutionDto: UpdateAirPollutionDto) {
    return this.airPollutionService.update(+id, updateAirPollutionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.airPollutionService.remove(+id);
  }
}
