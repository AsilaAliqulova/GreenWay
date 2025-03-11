import { Controller, Post, Body, Param, HttpCode, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto, SignInUserDto } from '../user/dto';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookie_getter.decorator';
import { CreateAdminDto, SignInAdminDto } from '../admin/dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: "Yangi foydalanuvchi ro'yhatdan o'tqazish" })
  @ApiResponse({
    status: 201,
    description: "Ro'yhatdan o'tgan foydalanuvchi",
    type: String,
  })
  @Post("signup-user")
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @ApiOperation({ summary: "Tizimga kirish" })
  @HttpCode(HttpStatus.OK)
  @Post("signIn-user")
  async signIn(
    @Body() signInDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signIn(signInDto, res);
  }

  @HttpCode(200)
  @Post("signout-user")
  async signOut(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOut(refreshToken, res);
  }


  @HttpCode(200)
  @Post(":id/refresh")
  refresh(
    @Param("id") id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }

  @ApiOperation({ summary: "Tizimga kirish" })
  @HttpCode(HttpStatus.OK)
  @Post("signIn-admin")
  async signInAdmin(
    @Body() signInDto: SignInAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInAdmin(signInDto, res);
  }

  @HttpCode(200)
  @Post("signout-user")
  async signOutAdmin(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutAdmin(refreshToken, res);
  }

  // @ApiOperation({ summary: "Yangi adminni ro'yhatdan o'tqazish" })
  // @ApiResponse({
  //   status: 201,
  //   description: "Ro'yhatdan o'tgan admin",
  //   type: String,
  // })
  // @Post("signup-admin")
  // async signUpAdmin(@Body() createadminDto: CreateAdminDto) {
  //   return this.authService.signUpAdmin(createadminDto);
  // }

}
