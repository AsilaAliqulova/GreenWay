import { Module } from '@nestjs/common';
import { AirPollutionService } from './air_pollution.service';
import { AirPollutionController } from './air_pollution.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [AirPollutionController],
  providers: [AirPollutionService],
})
export class AirPollutionModule {}
