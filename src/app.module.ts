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
import { ChallengesModule } from './challenges/challenges.module';
import { ParticipationsModule } from './participations/participations.module';
import { LikeModule } from './like/like.module';
import { CommentsModule } from './comments/comments.module';
import { CoinModule } from './coin/coin.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { DeliveryModule } from './delivery/delivery.module';
import { OrderItemModule } from './order_item/order_item.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { AirPollutionModule } from './air_pollution/air_pollution.module';
import { WaterPollutionModule } from './water_pollution/water_pollution.module';
import { SoilPollutionModule } from './soil_pollution/soil_pollution.module';
import { AuthModule } from './auth/auth.module';
import { OtpModule } from './otp/otp.module';



@Module({
  imports:[ConfigModule.forRoot({envFilePath: ".env", isGlobal:true}),PrismaModule, AdminModule, UserModule, OrganizationModule, ContentModule, MediaModule, EcoReportModule, VotesModule, UserVotesModule, EventModule, ChallengesModule, ParticipationsModule, LikeModule, CommentsModule, CoinModule, OrderModule, ProductModule, DeliveryModule, OrderItemModule, RegionModule, DistrictModule, AirPollutionModule, WaterPollutionModule, SoilPollutionModule, AuthModule, OtpModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
