import { Controller, Post, Body, Param, HttpCode, Res, HttpStatus, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto, SignInUserDto } from '../user/dto';
import { Response } from 'express';
import { CookieGetter } from '../decorators/cookie_getter.decorator';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: "New User Registration" })
  @ApiResponse({
    status: 201,
    description: "Registered user",
    type: String,
  })
  @UseGuards()
  @Post("signup-user")
    @UseInterceptors(FileInterceptor("image_url"))
  async signUp(@Body() createUserDto: CreateUserDto,@UploadedFile() image_url: Express.Multer.File) {
    return this.authService.signUp(createUserDto,image_url);
  }

  @ApiOperation({ summary: "Log in" })
  @HttpCode(HttpStatus.OK)
  @Post("signIn")
  async signIn(
    @Body() signInDto: SignInUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.signIn(signInDto, res);
  }

  @HttpCode(200)
  @Post("signout")
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

 

}
