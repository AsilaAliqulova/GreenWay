import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createCommentDto: CreateCommentDto) {
    try {
      return await this.prismaService.comments.create({ data: { ...createCommentDto } });
    } catch (error) {
      console.log("CommentsService create:", error);

      throw new InternalServerErrorException('Failed to create comment');
    }
  }

  async findAll() {
    return await this.prismaService.comments.findMany({ include: { user: { select: { fullname: true } }, ecoReport: { select: { title: true } } } });
  }


  async findOne(id: number) {
    const comment = await this.prismaService.comments.findUnique({
      where: { id },
      include: { user: { select: { fullname: true } }, ecoReport: { select: { title: true } } }
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;

  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    try {
      await this.findOne(id);
      return await this.prismaService.comments.update({ where: { id }, data: { ...updateCommentDto } });
    } catch (error) {
      console.log("CommentService update:", error);

      throw new InternalServerErrorException('Failed to update commment');
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prismaService.comments.delete({ where: { id } });

  }
}
