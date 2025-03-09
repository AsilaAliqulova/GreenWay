import { PartialType } from '@nestjs/swagger';
import { CreateSoilPollutionDto } from './create-soil_pollution.dto';

export class UpdateSoilPollutionDto extends PartialType(CreateSoilPollutionDto) {}
