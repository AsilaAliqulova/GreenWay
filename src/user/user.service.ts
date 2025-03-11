import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';



@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }
  async create(createUserDto: CreateUserDto) {
    try {
      const { password, confirm_password, ...data } = createUserDto
      if (password != confirm_password) {
        throw new BadRequestException("passwords are not the same")
      }
      const hashedPassword = await bcrypt.hash(password, 7);
      const newUser = await this.prismaService.user.create({
        data: { ...data, hashedPassword }
      })
      return newUser
    } catch (error) {
      console.log("UserService create:", error);
      throw new InternalServerErrorException('Failed to create user');

    }
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      let hashedPassword = user.hashedPassword;

      if (updateUserDto.password) {
        hashedPassword = await bcrypt.hash(updateUserDto.password, 7)
        delete updateUserDto.password;
      }

      return await this.prismaService.user.update({
        where: { id },
        data: { ...updateUserDto, hashedPassword },
      });
    } catch (error) {
      console.error("userService update:", error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prismaService.user.delete({ where: { id } })
  }

  async findUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } })
    return user

  }

  async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
    const updateUser = await this.prismaService.user.update({
      where: { id },
      data: { hashedToken: hashed_refresh_token },
    });
    return updateUser;
  }

  async activateUser(id: number) {
    return this.prismaService.user.update({
      where: { id },
      data: { is_active: true },
    });
  }

}
