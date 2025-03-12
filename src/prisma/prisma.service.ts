import { Injectable, OnModuleDestroy, OnModuleInit, InternalServerErrorException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });

    this.$use(async (params, next) => {
      if (params.model === 'Coins' && params.action === 'create') {
        try {
          const result = await next(params);

          if (!result.userId || !result.amount) {
            console.error("Coins jadvalidagi userId yoki amount maydonlari topilmadi");
            throw new InternalServerErrorException("Coins jadvalidagi userId yoki amount maydonlari topilmadi");
          }

          await this.user.update({
            where: { id: result.userId },
            data: {
              balance: {
                increment: result.amount,
              },
            },
          });

          return result;
        } catch (error) {
          console.error("Prisma middleware xatolik:", error);
          throw new InternalServerErrorException("Prisma middleware xatolik");
        }
      }
      return next(params);
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}