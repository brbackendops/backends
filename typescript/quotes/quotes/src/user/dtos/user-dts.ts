import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UserBody {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @MinLength(5)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UserLogin {
  @IsNotEmpty()
  @MaxLength(300)
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UserUpdateBody {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @MinLength(5)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  email: string;
}
