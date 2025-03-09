import { PartialType } from '@nestjs/swagger';
import { CreateEcoReportDto } from './create-eco_report.dto';

export class UpdateEcoReportDto extends PartialType(CreateEcoReportDto) {}
