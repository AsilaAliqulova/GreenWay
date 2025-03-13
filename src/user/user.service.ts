import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAdminDto, CreateUserDto, UpdateUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { FileService } from '../file/file.service';
import { MailService } from '../mail/mail.service';
import * as uuid from "uuid";



@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
    private readonly mailService: MailService,

  ) { }
  async create(createUserDto: CreateUserDto, image_url: Express.Multer.File) {
    try {
      const candidate = await this.findUserByEmail(createUserDto.email);
      if (candidate) {
        throw new BadRequestException("There is such a user");
      }
      const { password, ...data } = createUserDto;
      const hashPassword = await bcrypt.hash(password, 7);
      const activation_link = uuid.v4();

      const newSeller = await this.prismaService.user.create({
        data: {
          ...data,
          hashedPassword: hashPassword,
          activation_link: activation_link,
        },
      });

      return newSeller;
    } catch (error) {
      console.log("createUser", error);
    }
  }

  async createAdmin(createUserDto: CreateAdminDto) {
    try {
      const candidate = await this.findUserByEmail(createUserDto.email);
      if (candidate) {
        throw new BadRequestException("There is such a user");
      }
  
      const { password, confirm_password, ...data } = createUserDto;
  
      if (password !== confirm_password) {
        throw new BadRequestException("Passwords do not match");
      }
  
      const hashPassword = await bcrypt.hash(password, 7);
  
      const newSeller = await this.prismaService.user.create({
        data: {
          ...data,
          hashedPassword: hashPassword
        },
      });
  
      return newSeller;
    } catch (error) {
      console.error("createUser ERROR:", error);
      throw new InternalServerErrorException("Failed to create user");
    }
  }
  


  findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: Number(id) },
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
    console.log("email", email)
    const user = await this.prismaService.user.findUnique({ where: { email } })
    console.log(user)
    return user
  }



  async updateRefreshToken(id: number, hashed_refresh_token: string | null) {
    const updateUser = await this.prismaService.user.update({
      where: { id },
      data: { hashedToken: hashed_refresh_token },
    });
    return updateUser;
  }


  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }

    const user = await this.prismaService.user.findFirst({
      where: { activation_link: link },
    });

    if (!user) {
      throw new BadRequestException('Invalid activation link');
    }

    if (user.is_active) {
      throw new BadRequestException('User already activated');
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: { is_active: true },
    });

    return {
      message: 'User activated successfully',
      user: updatedUser.is_active,
    };
  }


  async getAllAdmins() {
    return this.prismaService.user.findMany({
      where: {
        role: "admin"
      },
    });
  }

}
