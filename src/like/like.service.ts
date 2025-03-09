import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikeService {
  constructor(private readonly prismaService: PrismaService) { }

 async create(createLikeDto: CreateLikeDto) {
    try {
      return await this.prismaService.like.create({ data: { ...createLikeDto } });
    } catch (error) {
      console.log("LikeService create:", error);

      throw new InternalServerErrorException('Failed to create like');
    }
  }

 async findAll() {
    try {
      return await this.prismaService.like.findMany({ include: { user: { select: { fullname: true } } ,ecoReport: { select: { title: true } } } });
    } catch (error) {
      console.log("LikeService findAll :", error);
      throw new InternalServerErrorException('Failed to retrieve like');
    }
  }


  async findOne(id: number) {
    try {
      const like = await this.prismaService.like.findUnique({
        where: { id },
        include: { user: { select: { fullname: true } },ecoReport:{select:{title:true}} }
      });

      if (!like) {
        throw new NotFoundException('like not found');
      }

      return like;
    } catch (error) {
      console.log("LikeService findOne:", error);

      throw new InternalServerErrorException('Failed to retrieve like');
    }
  }

async  update(id: number, updateLikeDto: UpdateLikeDto) {
    try {
      await this.findOne(id);
      return await this.prismaService.like.update({ where: { id }, data: { ...updateLikeDto } });
    } catch (error) {
      console.log("LikeService update:", error);

      throw new InternalServerErrorException('Failed to update like');
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      return await this.prismaService.like.delete({ where: { id } });
    } catch (error) {
      console.log("LikeService remove:", error);

      throw new InternalServerErrorException('Failed to delete like');
    }
  }
}
