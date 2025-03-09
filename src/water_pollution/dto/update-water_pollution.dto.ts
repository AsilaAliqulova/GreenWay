import { PartialType } from '@nestjs/swagger';
import { CreateWaterPollutionDto } from './create-water_pollution.dto';

export class UpdateWaterPollutionDto extends PartialType(CreateWaterPollutionDto) {}
