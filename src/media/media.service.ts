import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FileService } from '../file/file.service';

@Injectable()
export class MediaService {
  constructor(private readonly prismaService: PrismaService,
    private readonly fileService: FileService

  ) { }

  async create(createMediaDto: CreateMediaDto, url: Express.Multer.File) {
    try {
      const fileName = await this.fileService.saveFile(url);
      return await this.prismaService.media.create({ data: { ...createMediaDto, url: fileName } });
    } catch (error) {
      console.log("MediaService create error:", error);
      throw new InternalServerErrorException('Failed to create media');
    }
  }

  async findAll() {
    return await this.prismaService.media.findMany({
      include: { content: true, ecoReport: { select: { title: true } } }
    });

  }

  async findOne(id: number) {
    const media = await this.prismaService.media.findUnique({
      where: { id },
      include: { content: true, ecoReport: { select: { title: true } } }
    });

    if (!media) {
      throw new NotFoundException('Media not found');
    }

    return media;

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
    await this.findOne(id);
    return await this.prismaService.media.delete({ where: { id } });

  }
}
