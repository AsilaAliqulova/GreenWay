import { Module } from '@nestjs/common';
import { EcoReportService } from './eco_report.service';
import { EcoReportController } from './eco_report.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [EcoReportController],
  providers: [EcoReportService],
})
export class EcoReportModule {}
