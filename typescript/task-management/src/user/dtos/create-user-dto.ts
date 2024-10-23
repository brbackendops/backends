import { IsNotEmpty , IsString, MaxLength, MinLength } from "class-validator";

export class UserBody {

    @IsString()
    @MinLength(5)
    @MaxLength(15)
    @IsNotEmpty()
    username: string;

    @MinLength(5)
    @MaxLength(50)
    @IsNotEmpty()
    password:string;
}