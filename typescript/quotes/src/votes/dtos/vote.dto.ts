import { IsNotEmpty, IsUUID } from 'class-validator';

export class VoteBody {
  @IsNotEmpty()
  @IsUUID()
  quotes: string;

  created: string;
}
