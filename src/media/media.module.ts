import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { FileModule } from '../file/file.module';

@Module({
  imports:[PrismaModule,FileModule],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
