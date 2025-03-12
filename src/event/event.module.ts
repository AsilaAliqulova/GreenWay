import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { FileModule } from '../file/file.module';

@Module({
  imports:[PrismaModule,FileModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
