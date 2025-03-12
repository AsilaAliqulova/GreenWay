import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FileService } from '../file/file.service';

@Injectable()
export class ChallengesService {
  constructor(private readonly prismaService: PrismaService,
    private readonly fileService: FileService

  ) { }

  async create(createChallengeDto: CreateChallengeDto, image_url: Express.Multer.File) {
    try {
      const fileName = await this.fileService.saveFile(image_url);
      return await this.prismaService.challenges.create({ data: { ...createChallengeDto, image_url: fileName } });
    } catch (error) {
      console.log("ChallengesService create:", error);

      throw new InternalServerErrorException('Failed to create challenges');
    }
  }

  async findAll() {

    return await this.prismaService.challenges.findMany({ include: { organization: { select: { name: true } } } });

  }

  async findOne(id: number) {
    const challenges = await this.prismaService.challenges.findUnique({
      where: { id },
      include: { organization: { select: { name: true } } }
    });

    if (!challenges) {
      throw new NotFoundException('Challenges not found');
    }

    return challenges;

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
    await this.findOne(id);
    return await this.prismaService.challenges.delete({ where: { id } });

  }
}
