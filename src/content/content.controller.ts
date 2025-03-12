import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { JwtCreatorGuard } from '../guards/jwt-creator.guard';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) { }

  @Post()
  @UseGuards(JwtAuthGuard, JwtCreatorGuard)
  create(@Body() createContentDto: CreateContentDto) {
    return this.contentService.create(createContentDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.contentService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.contentService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, JwtCreatorGuard)
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto) {
    return this.contentService.update(+id, updateContentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, JwtCreatorGuard)
  remove(@Param('id') id: string) {
    return this.contentService.remove(+id);
  }
}
