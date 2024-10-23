import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class QuotesBody {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class QuotesUpdate {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
