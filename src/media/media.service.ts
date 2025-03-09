import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediaService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createMediaDto: CreateMediaDto) {
    try {
      return await this.prismaService.media.create({ data: { ...createMediaDto } });
    } catch (error) {
      console.log("MediaService create error:", error);
      throw new InternalServerErrorException('Failed to create media');
    }
  }

  async findAll() {
    try {
      return await this.prismaService.media.findMany({ 
        include: { content: true, ecoReport: { select: { title: true } } } 
      });
    } catch (error) {
      console.log("MediaService findAll error:", error);
      throw new InternalServerErrorException('Failed to retrieve media');
    }
  }

  async findOne(id: number) {
    try {
      const media = await this.prismaService.media.findUnique({
        where: { id },
        include: { content: true, ecoReport: { select: { title: true } } }
      });

      if (!media) {
        throw new NotFoundException('Media not found');
      }

      return media;
    } catch (error) {
      console.log("MediaService findOne error:", error);
      throw new InternalServerErrorException('Failed to retrieve media');
    }
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    try {
      await this.findOne(id);
      return await this.prismaService.media.update({ where: { id }, data: { ...updateMediaDto } });
    } catch (error) {
      console.log("MediaService update error:", error);
      throw new InternalServerErrorException('Failed to update media');
    }
  }

  async remove(id: number) {
    try {
      await this.findOne(id);
      return await this.prismaService.media.delete({ where: { id } });
    } catch (error) {
      console.log("MediaService remove error:", error);
      throw new InternalServerErrorException('Failed to delete media');
    }
  }
}
