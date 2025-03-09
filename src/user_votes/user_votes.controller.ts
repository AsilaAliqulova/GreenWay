import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserVotesService } from './user_votes.service';
import { CreateUserVoteDto } from './dto/create-user_vote.dto';
import { UpdateUserVoteDto } from './dto/update-user_vote.dto';

@Controller('user-votes')
export class UserVotesController {
  constructor(private readonly userVotesService: UserVotesService) {}

  @Post()
  create(@Body() createUserVoteDto: CreateUserVoteDto) {
    return this.userVotesService.create(createUserVoteDto);
  }

  @Get()
  findAll() {
    return this.userVotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userVotesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserVoteDto: UpdateUserVoteDto) {
    return this.userVotesService.update(+id, updateUserVoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userVotesService.remove(+id);
  }
}
