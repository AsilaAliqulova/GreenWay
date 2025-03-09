import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from "./prisma/prisma.module";
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { ContentModule } from './content/content.module';
import { MediaModule } from './media/media.module';
import { EcoReportModule } from './eco_report/eco_report.module';
import { VotesModule } from './votes/votes.module';
import { UserVotesModule } from './user_votes/user_votes.module';
import { EventModule } from './event/event.module';



@Module({
  imports:[ConfigModule.forRoot({envFilePath: ".env", isGlobal:true}),PrismaModule, AdminModule, UserModule, OrganizationModule, ContentModule, MediaModule, EcoReportModule, VotesModule, UserVotesModule, EventModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
