import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/role.guard';



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @UseInterceptors(FileInterceptor("image_url"))
  create(@Body() createUserDto: CreateUserDto, @UploadedFile() image_url: Express.Multer.File) {
    return this.userService.create(createUserDto, image_url);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin')
  async getAdmins() {
    return this.userService.getAllAdmins();
  }

  @Post("admin")
  createAdmin(@Body() createAdminDto: CreateUserDto,) {
    return this.userService.createAdmin(createAdminDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get("/email:email")
  findUserByEmail(@Body("email") email: string) {
    return this.userService.findUserByEmail(email);
  }

  @Get("activate/:link")
  activate(@Param("link") link: string) {
    return this.userService.activate(link);
  }


}
