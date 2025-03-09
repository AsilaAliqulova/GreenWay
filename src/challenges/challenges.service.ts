import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChallengesService {
  constructor(private readonly prismaService: PrismaService) { }

 async create(createChallengeDto: CreateChallengeDto) {
    try {
      return await this.prismaService.challenges.create({ data: { ...createChallengeDto } });
    } catch (error) {
      console.log("ChallengesService create:", error);

      throw new InternalServerErrorException('Failed to create challenges');
    }
  }

  async findAll() {
    try {
      return await this.prismaService.challenges.findMany({ include: { organization: { select: { name: true } } } });
    } catch (error) {
      console.log("ChallengesService findAll :", error);
      throw new InternalServerErrorException('Failed to retrieve challenges');
    }
  }

  async findOne(id: number) {
    try {
      const challenges = await this.prismaService.challenges.findUnique({
        where: { id },
        include: { organization: { select: { name: true } } }
      });

      if (!challenges) {
        throw new NotFoundException('Challenges not found');
      }

      return challenges;
    } catch (error) {
      console.log("ChallengesService findOne:", error);

      throw new InternalServerErrorException('Failed to retrieve challenges');
    }
  }

 async update(id: number, updateChallengeDto: UpdateChallengeDto) {
    try {
      await this.findOne(id);
      return await this.prismaService.challenges.update({ where: { id }, data: { ...updateChallengeDto } });
    } catch (error) {
      console.log("ChallengesService update:", error);

      throw new InternalServerErrorException('Failed to update challenges');
    }
  }

 async remove(id: number) {
    try {
      await this.findOne(id);
      return await this.prismaService.challenges.delete({ where: { id } });
    } catch (error) {
      console.log("ChallengesService remove:", error);

      throw new InternalServerErrorException('Failed to delete challenges');
    }
  }
}
