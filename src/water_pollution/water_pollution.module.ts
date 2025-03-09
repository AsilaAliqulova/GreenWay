import { Module } from '@nestjs/common';
import { WaterPollutionService } from './water_pollution.service';
import { WaterPollutionController } from './water_pollution.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [WaterPollutionController],
  providers: [WaterPollutionService],
})
export class WaterPollutionModule {}
