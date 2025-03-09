import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }
  create(createContentDto: CreateContentDto) {
    return this.prismaService.content.create({ data: { ...createContentDto } })

  }

  findAll() {
    return this.prismaService.content.findMany({ include: { admin: { select: { fullname: true } }, media: true } })

  }
  async findOne(id: number) {
    const content = await this.prismaService.content.findUnique({ where: { id }, include: { admin: { select: { fullname: true } }, media: true } })
    if (!content) {
      throw new NotFoundException("Content not found")
    }
    return content
  }

  async update(id: number, updateContentDto: UpdateContentDto) {
    await this.findOne(id)
    return this.prismaService.content.update({ where: { id }, data: { ...updateContentDto } })

  }

  async remove(id: number) {
    await this.findOne(id)
    return this.prismaService.content.delete({ where: { id } })

  }
}
