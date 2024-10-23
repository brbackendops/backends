import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserBody, UserUpdateBody } from './dtos/user-dts';

@Injectable()
export class UserReposioty extends Repository<User> {
  private readonly logger = new Logger('userReposiotry', { timestamp: true });

  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getUser(email: string): Promise<User> {
    try {
      const user = await this.findOneBy({
        email,
      });

      if (!user) {
        throw new NotFoundException('user not found');
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async createUser(payload: UserBody): Promise<string> {
    try {
      const user = this.create(payload);
      await this.save(user);
      return 'user created successfully';
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateUser(payload: UserUpdateBody, id: string): Promise<string> {
    try {
      const user = await this.findOneBy({ id });
      if (payload.email === undefined) {
        payload.email = user.email;
      }

      if (payload.name === undefined) {
        payload.name = user.name;
      }

      user.name = payload.name;
      user.email = payload.email;
      await this.save(user);
      return 'user updated successfully';
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteUser(id: string): Promise<string> {
    try {
      const user = await this.findOneBy({
        id,
      });
      console.log(user);
      if (!user) {
        throw new NotFoundException('user not found');
      }
      await this.delete({
        id,
      });
      return 'user deleted successfully';
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
