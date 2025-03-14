import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrganizationService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createOrganizationDto: CreateOrganizationDto) {
    try {
      return await this.prismaService.organization.create({
        data: {
          ...createOrganizationDto,
          website: createOrganizationDto.website ?? null,
          socials: createOrganizationDto.socials ?? null,
        },
      });
    } catch (error) {
      console.log("OrganizationService create error:", error);
      throw new InternalServerErrorException('Failed to create organization');
    }
  }

  async findAll() {
    return await this.prismaService.organization.findMany({
      include: {
        event: { select: { title: true, description: true, image_url: true } },
        challenges: { select: { title: true, description: true } },
        votes: { select: { title: true, description: true } },
      },
    });

  }

  async findOne(id: number) {
    const organization = await this.prismaService.organization.findUnique({
      where: { id },
      include: {
        event: { select: { title: true, description: true, image_url: true } },
        challenges: { select: { title: true, description: true } },
        votes: { select: { title: true, description: true } },
      },
    });

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    return organization;

  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    try {
      await this.findOne(id);
      return await this.prismaService.organization.update({ where: { id }, data: { ...updateOrganizationDto } });
    } catch (error) {
      console.log("OrganizationService update error:", error);
      throw new InternalServerErrorException('Failed to update organization');
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prismaService.organization.delete({ where: { id } });

  }
}
