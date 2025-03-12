import { Controller, Post, Body, Param, HttpCode, Res, HttpStatus, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto, SignInUserDto } from '../user/dto';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookie_getter.decorator';
import { SignInAdminDto } from '../admin/dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtSelfGuard } from '../guards/jst-self.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: "New User Registration" })
  @ApiResponse({
    status: 201,
    description: "Registered user",
    type: String,
  })
  @UseGuards(JwtSelfGuard)
  @Post("signup-user")
    @UseInterceptors(FileInterceptor("image_url"))
  async signUp(@Body() createUserDto: CreateUserDto,@UploadedFile() image_url: Express.Multer.File) {
    return this.authService.signUp(createUserDto,image_url);
  }

  @ApiOperation({ summary: "Log in" })
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

  @ApiOperation({ summary: "Log in" })
  @HttpCode(HttpStatus.OK)
  @Post("signIn-admin")
  async signInAdmin(
    @Body() signInDto: SignInAdminDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signInAdmin(signInDto, res);
  }

  @HttpCode(200)
  @Post("signout-admin")
  async signOutAdmin(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signOutAdmin(refreshToken, res);
  }

  @HttpCode(200)
  @Post(":id/refresh-admin")
  refreshAdmin(
    @Param("id") id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenAdmin(id, refreshToken, res);
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
