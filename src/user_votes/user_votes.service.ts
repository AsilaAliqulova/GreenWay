import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserVoteDto } from './dto/create-user_vote.dto';
import { UpdateUserVoteDto } from './dto/update-user_vote.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserVotesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserVoteDto: CreateUserVoteDto) {
    try {
      return await this.prismaService.userVotes.create({ data: { ...createUserVoteDto } });
    } catch (error) {
      console.log("UserVotesService create error:", error);
      throw new InternalServerErrorException('Failed to create user vote');
    }
  }

  async findAll() {
    try {
      return await this.prismaService.userVotes.findMany({
        include: { user: { select: { fullname: true } }, votes: { select: { title: true } } }
      });
    } catch (error) {
      console.log("UserVotesService findAll error:", error);
      throw new InternalServerErrorException('Failed to retrieve user votes');
    }
  }

  async findOne(id: number) {
    try {
      const userVotes = await this.prismaService.userVotes.findUnique({
        where: { id },
        include: { user: { select: { fullname: true } }, votes: { select: { title: true } } }
      });

      if (!userVotes) {
        throw new NotFoundException('User vote not found');
      }

      return userVotes;
    } catch (error) {
      console.log("UserVotesService findOne error:", error);
      throw new InternalServerErrorException('Failed to retrieve user vote');
    }
  }

  async update(id: number, updateUserVoteDto: UpdateUserVoteDto) {
    try {
      await this.findOne(id);
      return await this.prismaService.userVotes.update({ where: { id }, data: { ...updateUserVoteDto } });
    } catch (error) {
      console.log("UserVotesService update error:", error);
      throw new InternalServerErrorException('Failed to update user vote');
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      return await this.prismaService.userVotes.delete({ where: { id } });
    } catch (error) {
      console.log("UserVotesService remove error:", error);
      throw new InternalServerErrorException('Failed to delete user vote');
    }
  }
}
