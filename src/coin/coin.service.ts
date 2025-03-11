import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCoinDto } from './dto/create-coin.dto';
import { UpdateCoinDto } from './dto/update-coin.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoinService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createCoinDto: CreateCoinDto) {
    try {
      return await this.prismaService.coins.create({ data: { ...createCoinDto } });
    } catch (error) {
      console.log("CoinService create:", error);

      throw new InternalServerErrorException('Failed to create coin');
    }
  }

  async findAll() {
    return await this.prismaService.coins.findMany({ include: { user: { select: { fullname: true } } } });

  }

  async findOne(id: number) {
    const coins = await this.prismaService.coins.findUnique({
      where: { id },
      include: { user: { select: { fullname: true } } }
    });

    if (!coins) {
      throw new NotFoundException('coins not found');
    }

    return coins;

  }

  async update(id: number, updateCoinDto: UpdateCoinDto) {
    try {
      await this.findOne(id);
      return await this.prismaService.coins.update({ where: { id }, data: { ...updateCoinDto } });
    } catch (error) {
      console.log("coinsService update:", error);

      throw new InternalServerErrorException('Failed to update coin');
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prismaService.coins.delete({ where: { id } });

  }
}
