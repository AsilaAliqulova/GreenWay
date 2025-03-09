import { PartialType } from '@nestjs/swagger';
import { CreateAirPollutionDto } from './create-air_pollution.dto';

export class UpdateAirPollutionDto extends PartialType(CreateAirPollutionDto) {}
