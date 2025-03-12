import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { FileModule } from '../file/file.module';

@Module({
  imports:[PrismaModule,FileModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
