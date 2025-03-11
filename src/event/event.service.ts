import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createEventDto: CreateEventDto) {
    try {
      return await this.prismaService.event.create({ data: { ...createEventDto } });
    } catch (error) {
      console.log("EventService create error:", error);
      throw new InternalServerErrorException('Failed to create event');
    }
  }

  async findAll() {
    return await this.prismaService.event.findMany({
      include: { organization: { select: { name: true } } }
    });

  }

  async findOne(id: number) {
    const event = await this.prismaService.event.findUnique({
      where: { id },
      include: { organization: { select: { name: true } } }
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    return event;

  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    try {
      await this.findOne(id);
      return await this.prismaService.event.update({ where: { id }, data: { ...updateEventDto } });
    } catch (error) {
      console.log("EventService update error:", error);
      throw new InternalServerErrorException('Failed to update event');
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prismaService.event.delete({ where: { id } });

  }
}
