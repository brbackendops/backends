import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserBody, UserLogin, UserUpdateBody } from './dtos/user-dts';
import { UserReposioty } from './user.repository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserLoginResponse } from './response/user.response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserReposioty)
    private userRepo: UserReposioty,
  ) {}

  async registerUser(payload: UserBody): Promise<string> {
    try {
      const hpassword = bcrypt.hashSync(payload.password, 10);
      payload.password = hpassword;
      return this.userRepo.createUser(payload);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async loginUser(payload: UserLogin): Promise<UserLoginResponse> {
    try {
      const user = await this.userRepo.getUser(payload.email);
      const ok = bcrypt.compareSync(payload.password, user.password);
      if (!ok) {
        throw new BadRequestException('incorrrect password');
      }
      const data: {
        id: string;
        email: string;
        name: string;
      } = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      const token = await jwt.sign(data, '123812jkqdjqwejknlqqpweo190', {
        expiresIn: 2700,
      });

      return new UserLoginResponse('success', {
        token,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(id: string, payload: UserUpdateBody): Promise<string> {
    try {
      return this.userRepo.updateUser(payload, id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(id: string): Promise<string> {
    try {
      return this.userRepo.deleteUser(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
