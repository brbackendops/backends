import { UserDto , UserDtoLogin, UserDtoUpdate } from '../../dto';
import  User  from '../../models/User.entity';
import UserRepo from './../../repos/user/user_repo';
import HashFactory from '../../providers/hash';
import jwt from 'jsonwebtoken';
import "dotenv/config"

export class UserService {
    private userrepo: UserRepo;

    constructor(userrepo: UserRepo){
        this.userrepo = userrepo
    }

    async CreateUserService(payload: UserDto) : Promise<User> {
        try {
            const hf = new HashFactory()
            const hashedPassword = hf.hashPlainPassword(payload.password)
            payload.password = hashedPassword
            const user = await this.userrepo.createUser(payload)
            return user
        } catch (error: any) {
            if (error.code == "23505") {
                throw new Error("email already exists")
            }
            throw error
        }
    }

    async LoginUserService(payload:UserDtoLogin): Promise<string> {
        try {
            const user = await this.userrepo.getUser(payload.email)
            const hf = new HashFactory()

            if (!user) {
                throw new Error("user does not exists")
            }

            const isPasswordOk = hf.comparePasswords(payload.password,user.password)
            if (!isPasswordOk) {
                throw new Error("incorrect password")
            }

            const data: object = {
                id: user.id,
                username: user.username,
                email: user.email,
                country: user.email,
                address: user.address,
                city: user.city,
            }

            const secretKey: jwt.Secret = process.env.SECRET_KEY!
            const token: string = jwt.sign(data,secretKey,{
                expiresIn: "20m",
                algorithm: "HS256"
            });
            return token
        } catch (error) {
            throw error
        }
    }

    async UpdateUserService(payload: UserDtoUpdate): Promise<string> {
        try {
            const user = await this.userrepo.getUserById(payload.id)
            if (!user) {
                throw new Error("user doesnot exists")
            }
            const status = await this.userrepo.updateUser(payload)
            return status
        } catch (error) {
            throw error
        }
    }

    async GetUserService(id: number): Promise<User> {
        try {
            const user = await this.userrepo.getUserById(id)
            return user
        } catch (error: any) {
            throw error
        }
    }
}