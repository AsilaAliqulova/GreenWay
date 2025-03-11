import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto, UpdateAdminDto } from './dto';


@Injectable()
export class AdminService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }



  async create(createAdminDto: CreateAdminDto) {
    try {
      const { password, confirm_password, ...data } = createAdminDto
      if (password != confirm_password) {
        throw new BadRequestException("passwords are not the same")
      }
      const hashedPassword = await bcrypt.hash(password, 7);
      const newAdmin = await this.prismaService.admin.create({
        data: { ...data, hashedPassword }
      })
      return newAdmin
    } catch (error) {
      console.log("AdminService create:", error);
      throw new InternalServerErrorException('Failed to create admin');

    }
  }


  async findAll() {
    try {
      return await this.prismaService.admin.findMany();
    } catch (error) {
      console.log("AdminService findAll :", error);
      throw new InternalServerErrorException('Failed to retrieve Admin');
    }
  }


  async findOne(id: number) {
    try {
      const admin = await this.prismaService.admin.findUnique({
        where: { id },
      });

      if (!admin) {
        throw new NotFoundException('Admin not found');
      }

      return admin;
    } catch (error) {
      console.log("AdminService findOne:", error);

      throw new InternalServerErrorException('Failed to retrieve admin');
    }
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    try {
      const admin = await this.findOne(id);
      let hashedPassword = admin.hashedPassword;

      if (updateAdminDto.password) {
        hashedPassword = await bcrypt.hash(updateAdminDto.password, 7)
        delete updateAdminDto.password;
      }

      return await this.prismaService.admin.update({
        where: { id },
        data: { ...updateAdminDto, hashedPassword },
      });
    } catch (error) {
      console.error("adminService update:", error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to update admin');
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prismaService.admin.delete({ where: { id } })
  }

  async findAdminByEmail(email: string) {
    const admin = await this.prismaService.admin.findUnique({ where: { email } })
    return admin

  }

  async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
    const updateadmin = await this.prismaService.admin.update({
        where: { id },
        data: { hashedToken: hashed_refresh_token },  
    });
    return updateadmin;
}
}
