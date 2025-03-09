import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { UpdateParticipationDto } from './dto/update-participation.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ParticipationsService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createParticipationDto: CreateParticipationDto) {
    try {
      return await this.prismaService.participations.create({
        data: {
          ...createParticipationDto,
          eventId: createParticipationDto.eventId ?? null,
          challengesId: createParticipationDto.challengesId ?? null,
        },
      });

    } catch (error) {
      console.log("ParticipationssService create:", error);

      throw new InternalServerErrorException('Failed to create participations');
    }
  }

  async findAll() {
    try {
      return await this.prismaService.participations.findMany({ include: { user: { select: { fullname: true } }, event: { select: { title: true } }, challenges: { select: { title: true } } } });
    } catch (error) {
      console.log("participationsService findAll :", error);
      throw new InternalServerErrorException('Failed to retrieve participations');
    }
  }

  async findOne(id: number) {
    try {
      const participations = await this.prismaService.participations.findUnique({
        where: { id },
        include: { user: { select: { fullname: true } }, event: { select: { title: true } }, challenges: { select: { title: true } } }
      });

      if (!participations) {
        throw new NotFoundException('participations not found');
      }

      return participations;
    } catch (error) {
      console.log("participationsService findOne:", error);

      throw new InternalServerErrorException('Failed to retrieve participation');
    }
  }

  async update(id: number, updateParticipationDto: UpdateParticipationDto) {
    try {
      await this.findOne(id);
      return await this.prismaService.participations.update({ where: { id }, data: { ...updateParticipationDto } });
    } catch (error) {
      console.log("ParticipationsService update:", error);

      throw new InternalServerErrorException('Failed to update participations');
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      return await this.prismaService.participations.delete({ where: { id } });
    } catch (error) {
      console.log("ParticipationsService remove:", error);

      throw new InternalServerErrorException('Failed to delete participation');
    }
  }
}
