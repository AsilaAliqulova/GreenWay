import { Module } from '@nestjs/common';
import { UserVotesService } from './user_votes.service';
import { UserVotesController } from './user_votes.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [UserVotesController],
  providers: [UserVotesService],
})
export class UserVotesModule {}
