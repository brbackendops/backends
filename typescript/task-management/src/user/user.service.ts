import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserDataResponse, UserResponse } from './user.utils';
import { UserBody } from '../user/dtos/create-user-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userepo: UserRepository,
        private jwtservice: JwtService,
    ){}


    createUser(body: UserBody):Promise<UserResponse>{
        try {
            return this.userepo.createU(body)
        } catch (error) {
            throw error
        }
    }

    async loginUser(body: UserBody): Promise<UserResponse|UserDataResponse> {
        try {
            const user =  await this.userepo.getOne(body.username)
            if (!user) {
                return new UserResponse("failed","no user found with these data")
            }

            const OK = bcrypt.compareSync(body.password,user.password)
            if (!OK) {
                return new UserResponse("failed","incorrect password")
            }
            
            const token = await this.jwtservice.sign({
                username: body.username,
            });

            return new UserDataResponse("success",{
                token,
            })
        } catch (error) {
            throw error
        }
    }
}
