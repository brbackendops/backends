import {
  Body,
  Controller,
  HttpCode,
  Logger,
  Post,
  Header,
  Delete,
  Param,
  HttpStatus,
  ParseUUIDPipe,
  Patch,
  InternalServerErrorException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserBody, UserLogin } from './dtos/user-dts';
import { UserService } from './user.service';
import { UserLoginNormal, UserLoginResponse } from './response/user.response';
import { OwnerGuard } from './guards/owner.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  private readonly logger = new Logger('UserController', { timestamp: true });

  constructor(private userservice: UserService) {}

  @Post('/register')
  @HttpCode(201)
  async UserRegisterHandler(@Body() payload: UserBody): Promise<string> {
    try {
      this.logger.log('successfully created user');
      return this.userservice.registerUser(payload);
    } catch (error) {
      this.logger.log('user:register:error', error.message);
      throw new Error(error.message);
    }
  }

  @Post('/login')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async UserLoginHandler(
    @Body() payload: UserLogin,
  ): Promise<UserLoginResponse> {
    try {
      const res = await this.userservice.loginUser(payload);
      return res;
    } catch (error) {
      this.logger.log('user:login:error', error.message);
      throw error;
    }
  }

  @Patch('/:id/update')
  @HttpCode(200)
  @UseGuards(OwnerGuard)
  async UserUpdateHandler(
    @Body() payload: UserBody,
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ): Promise<UserLoginNormal> {
    try {
      const msg = await this.userservice.updateProfile(id, payload);
      return new UserLoginNormal('success', msg);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Delete('/:id/delete')
  @HttpCode(200)
  @UseGuards(OwnerGuard)
  async UserDeleteHandler(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ): Promise<UserLoginNormal> {
    try {
      const msg = await this.userservice.deleteUser(id);
      return new UserLoginNormal('success', msg);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('/logout')
  @HttpCode(200)
  async UserLogoutHandler(@Req() req: Request): Promise<UserLoginNormal> {
    try {
      req.user = null;
      return new UserLoginNormal('success', 'user logged out successfully');
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
