import { PartialType } from '@nestjs/swagger';
import { CreateUserVoteDto } from './create-user_vote.dto';

export class UpdateUserVoteDto extends PartialType(CreateUserVoteDto) {}
