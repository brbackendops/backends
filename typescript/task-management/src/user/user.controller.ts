import { Controller, Post , Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDataResponse, UserResponse } from './user.utils';
import { UserBody } from '../user/dtos/create-user-dto';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @Post("/register")
    registerUserHandler(@Body() body: UserBody): Promise<UserResponse> {
        return this.userService.createUser(body)
    }

    @Post("/login")
    loginUserHandler(@Body() body: UserBody): Promise<UserResponse|UserDataResponse> {
        return this.userService.loginUser(body)
    }
}
