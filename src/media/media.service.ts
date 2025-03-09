import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediaService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }
  create(createMediaDto: CreateMediaDto) {
    return this.prismaService.media.create({ data: { ...createMediaDto } })

  }

  findAll() {
    return this.prismaService.media.findMany({ include: { content: true, ecoReport: { select: { title: true } } } })

  }

  async findOne(id: number) {
    const media = await this.prismaService.media.findUnique({ where: { id }, include: { content: true, ecoReport: { select: { title: true } } } })
    if (!media) {
      throw new NotFoundException("Media not found")
    }
    return media
  }
  async update(id: number, updateMediaDto: UpdateMediaDto) {
    await this.findOne(id)
    return this.prismaService.media.update({ where: { id }, data: { ...updateMediaDto } })

  }

  async remove(id: number) {
    await this.findOne(id)
    return this.prismaService.media.delete({ where: { id } })

  }
}
