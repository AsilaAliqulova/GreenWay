import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { Admin, User } from '@prisma/client';
import { CreateUserDto, SignInUserDto } from '../user/dto';
import * as bcrypt from "bcrypt";
import { Response } from 'express';
import { CreateAdminDto, SignInAdminDto } from '../admin/dto';
import { UserService } from '../user/user.service';



@Injectable()
export class AuthService {
  constructor(
    private readonly jwtServise: JwtService,

    private readonly userService: UserService,
    private readonly adminService: AdminService,
  ) { }

  //**********User**************//
  async getTokens(user: User) {
    const payload = {
      id: user.id,
      email: user.email
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


  async signUp(createUserDto: CreateUserDto) {
    const candidate = await this.userService.findUserByEmail(
      createUserDto.email
    );

    if (candidate) {
      throw new BadRequestException("there is such a user");
    }

    const newUser = await this.userService.create(createUserDto);
    const response = {
      message: "Congratulations you joined the system.",
      userId: newUser.id,
    };

    return response;
  }

  async signIn(signInDto: SignInUserDto, res: Response) {
    const { email, password } = signInDto;
    const user = await this.userService.findUserByEmail(email);
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
      message: "User logged in",
      userId: user.id,
      access_token: tokens.access_token,
    };
    return response;
  }

  async signOut(refreshToken: string, res: Response) {
    const userData = await this.jwtServise.verify(refreshToken, {
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

  //***********Admin***********/

  async getTokensAdmin(admin: Admin) {
    const payload = {
      id: admin.id,
      name:admin.fullname ,
      is_creator:admin.is_creator
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtServise.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY_ADMIN,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtServise.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY_ADMIN,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      resfresh_token: refreshToken,
    };
  }

  async signUpAdmin(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminService.findAdminByEmail(
      createAdminDto.email
    );

    if (candidate) {
      throw new BadRequestException("there is such a admin");
    }

    const newAdmin = await this.adminService.create(createAdminDto);
    const response = {
      message: "Congratulations you joined the system.",
      userId: newAdmin.id,
    };

    return response;
  }

  async signInAdmin(signInDtoAdmin: SignInAdminDto, res: Response) {
    
    const { password } = signInDtoAdmin;
    const admin = await this.adminService.findAdminByEmail(signInDtoAdmin.email);
    if (!admin) {
      throw new UnauthorizedException("email or password incorrect");
    }

    const isMatchPass = await bcrypt.compare(password, admin.hashedPassword);
    if (!isMatchPass) {
      throw new BadRequestException("password do not match");
    }
    const tokens = await this.getTokensAdmin(admin);
    const hashed_refresh_token = await bcrypt.hash(tokens.resfresh_token, 7);
    const updateAdmin = await this.adminService.updateRefreshToken(
      admin.id,
      hashed_refresh_token
    );
    if (!updateAdmin) {
      throw new InternalServerErrorException("Token storage error");
    }

    res.cookie("refresh_token", tokens.resfresh_token, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const response = {
      message: "Admin logged in",
      userId: admin.id,
      access_token: tokens.access_token,
    };
    return response;
  }

  async signOutAdmin(refreshToken: string, res: Response) {
    const userData = await this.jwtServise.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY_ADMIN,
    });
    if (!userData) {
      throw new ForbiddenException("Admin not verified");
    }
    const hashed_refresh_token = null;
    await this.userService.updateRefreshToken(
      userData.id,
      hashed_refresh_token
    );

    res.clearCookie("refresh_token");
    const response = {
      message: "Admin logged out successfully",
    };
    return response;
  }


}
