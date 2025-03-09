import { Module } from '@nestjs/common';
import { SoilPollutionService } from './soil_pollution.service';
import { SoilPollutionController } from './soil_pollution.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [SoilPollutionController],
  providers: [SoilPollutionService],
})
export class SoilPollutionModule {}
