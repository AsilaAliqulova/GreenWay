import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CreateUserDto, SignInUserDto } from '../user/dto';
import * as bcrypt from "bcrypt";
import { Response } from 'express';
import { UserService } from '../user/user.service';
import { FileService } from '../file/file.service';
import * as uuid from "uuid";
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';



@Injectable()
export class AuthService {
  constructor(
    private readonly jwtServise: JwtService,
    private readonly userService: UserService,
    private readonly fileService: FileService,
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,




  ) { }

  async getTokens(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      is_active: user.is_active,
      role: user.role
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtServise.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtServise.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      resfresh_token: refreshToken,
    };
  }


  async signUp(createUserDto: CreateUserDto, image_url: Express.Multer.File) {
    try {
      if (!image_url) throw new BadRequestException("The file is incorrect or empty");

      const fileName = await this.fileService.saveFile(image_url);
      const { password, confirm_password, ...data } = createUserDto;
      const activation_link = uuid.v4()

      if (password !== confirm_password) {
        throw new BadRequestException("Passwords are not the same");
      }

      const hashedPassword = await bcrypt.hash(password, 7);
      const newUser = await this.prismaService.user.create({
        data: { ...data, hashedPassword, image_url: fileName, activation_link: activation_link }
      });

      await this.mailService.sendMail(newUser);
      return newUser

    } catch (error) {
      console.error("UserService create:", error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException("Failed to create user");
    }
  }



  async signIn(signInDtoUser: SignInUserDto, res: Response) {

    const { password } = signInDtoUser;
    const user = await this.userService.findUserByEmail(signInDtoUser.email);
    if (!user) {
      throw new UnauthorizedException("email or password incorrect");
    }

    const isMatchPass = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatchPass) {
      throw new BadRequestException("password do not match");
    }
    const tokens = await this.getTokens(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.resfresh_token, 7);
    const updateUser = await this.userService.updateRefreshToken(
      user.id,
      hashed_refresh_token
    );
    if (!updateUser) {
      throw new InternalServerErrorException("Token storage error");
    }

    res.cookie("refresh_token", tokens.resfresh_token, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const response = {
      message: "Admin logged in",
      userId: user.id,
      access_token: tokens.access_token,
    };
    return response;
  }

  async signOut(refreshToken: string, res: Response) {
    let userData = await this.jwtServise.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException("User not verified");
    }
    const hashed_refresh_token = null;
    await this.userService.updateRefreshToken(
      userData.id,
      hashed_refresh_token
    );

    res.clearCookie("refresh_token");
    const response = {
      message: "User logged out successfully",

    };
    return response;
  }

  async refreshToken(userId: number, refreshToken: string, res: Response) {
    const decodedToken = await this.jwtServise.decode(refreshToken);
    if (userId != decodedToken["id"]) {
      throw new BadRequestException("Not allowed1");
    }
    const user = await this.userService.findOne(userId);

    if (!user || !user.hashedToken) {
      throw new BadRequestException("Not allowed2");
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashedToken
    );

    if (!tokenMatch) {
      throw new ForbiddenException("Forbidden");
    }

    const tokens = await this.getTokens(user);

    const hashed_refresh_token = await bcrypt.hash(tokens.resfresh_token, 7);
    await this.userService.updateRefreshToken(user.id, hashed_refresh_token);

    res.cookie("refresh_token", tokens.resfresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    const response = {
      message: "User logged in",
      userId: user.id,
      access_token: tokens.access_token,
    };
    return response;
  }

 

}
