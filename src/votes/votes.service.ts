import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VotesService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createVoteDto: CreateVoteDto) {
    try {
      return await this.prismaService.votes.create({ data: { ...createVoteDto } });
    } catch (error) {
      console.log("VotesService create:", error);

      throw new InternalServerErrorException('Failed to create vote');
    }
  }

  async findAll() {
    try {
      return await this.prismaService.votes.findMany({ include: { organization: { select: { name: true } } } });
    } catch (error) {
      console.log("VotesService findAll :", error);
      throw new InternalServerErrorException('Failed to retrieve votes');
    }
  }

  async findOne(id: number) {
    try {
      const votes = await this.prismaService.votes.findUnique({
        where: { id },
        include: { organization: { select: { name: true } } }
      });

      if (!votes) {
        throw new NotFoundException('Votes not found');
      }

      return votes;
    } catch (error) {
      console.log("VotesService findOne:", error);

      throw new InternalServerErrorException('Failed to retrieve vote');
    }
  }

  async update(id: number, updateVoteDto: UpdateVoteDto) {
    try {
      await this.findOne(id);
      return await this.prismaService.votes.update({ where: { id }, data: { ...updateVoteDto } });
    } catch (error) {
      console.log("VotesService update:", error);

      throw new InternalServerErrorException('Failed to update vote');
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      return await this.prismaService.votes.delete({ where: { id } });
    } catch (error) {
      console.log("VotesService remove:", error);

      throw new InternalServerErrorException('Failed to delete vote');
    }
  }
}
