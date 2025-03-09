import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createContentDto: CreateContentDto) {
    try {
      return await this.prismaService.content.create({ data: { ...createContentDto } });
    } catch (error) {
      console.log("ContentService create:", error);
      throw new InternalServerErrorException('Failed to create content');
    }
  }

  async findAll() {
    try {
      return await this.prismaService.content.findMany({ 
        include: { admin: { select: { fullname: true } }, media: true } 
      });
    } catch (error) {
      console.log("ContentService findAll:", error);
      throw new InternalServerErrorException('Failed to retrieve content');
    }
  }

  async findOne(id: number) {
    try {
      const content = await this.prismaService.content.findUnique({
        where: { id },
        include: { admin: { select: { fullname: true } }, media: true }
      });

      if (!content) {
        throw new NotFoundException('Content not found');
      }

      return content;
    } catch (error) {
      console.log("ContentService findOne:", error);
      throw new InternalServerErrorException('Failed to retrieve content');
    }
  }

  async update(id: number, updateContentDto: UpdateContentDto) {
    try {
      await this.findOne(id);
      return await this.prismaService.content.update({ where: { id }, data: { ...updateContentDto } });
    } catch (error) {
      console.log("ContentService update:", error);
      throw new InternalServerErrorException('Failed to update content');
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      return await this.prismaService.content.delete({ where: { id } });
    } catch (error) {
      console.log("ContentService remove:", error);
      throw new InternalServerErrorException('Failed to delete content');
    }
  }
}
