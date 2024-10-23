import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { UserBody } from "../user/dtos/create-user-dto";
import { UserDataResponse, UserResponse } from "./user.utils";
import { ConflictException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserRepository extends Repository<User> {
    private readonly userLogger = new Logger("UserRepository", { timestamp: true });
    
    constructor(private dataSource: DataSource){
        super(User, dataSource.createEntityManager()); 
    }

    async createU(body: UserBody): Promise<UserResponse> {
        try {
            const hashedPassword = bcrypt.hashSync(body.password, 10);
            const user = this.create({
                username: body.username,
                password: hashedPassword,
            });
            await this.save(user);
            return new UserResponse("success", "user registered successfully");
        } catch (error) {
            if (error.code === 23505) {
                this.userLogger.error(error.message);
                throw new ConflictException("Username already exists");
            } else {
                this.userLogger.error(error.message);
                throw new InternalServerErrorException(error.message);
            }
        }
    }

    async getOne(username: string): Promise<User> {
        try {
            return await this.findOneBy({
                username,
            });
        } catch (error) {
            this.userLogger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async getUser(body: UserBody): Promise<UserResponse | UserDataResponse> {
        try {
            const user = await this.findOneBy({
                username: body.username,
            });

            if (!user) {
                return new UserResponse("failed", "no user found with these data");
            }

            return new UserDataResponse("success", user);
        } catch (error) {
            this.userLogger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }
}



// export interface UserRepository extends Repository<User> {
//     //this: Repository<User>;
//     createU(body:UserBody):Promise<UserResponse>;
//     getOne(username:string): Promise<User>
//     getUser(body:UserBody): Promise<UserResponse|UserDataResponse>
// }

// const userLogger = new Logger("UserRepository",{
//     timestamp: true
// })

// export const UserRepoMethods: Pick<UserRepository,'createU'|'getOne'|'getUser'> = {

//     async createU( this: Repository<User>,body): Promise<UserResponse> {
//         try {

//             const hpassword = bcrypt.hashSync(body.password,10)
//             const user =  this.create({
//                 username: body.username,
//                 password: hpassword,
//             });
//             await this.save(user)
//             const res = new UserResponse("sucess","user registered successfully")
//             return res
//         } catch (error) {
//             if ( error.code == 23505 ) {
//                 userLogger.error(error.message)
//                 throw new ConflictException("username already exists")
//             } else {
//                 userLogger.error(error.message)
//                 throw new InternalServerErrorException(error.message)                
//             }
//         }
//     },

//     async getOne( this: Repository<User>,username: string): Promise<User> {
//         try {
            
//             const user = await this.findOneBy({
//                 username,
//             });
//             return user
//         } catch (error) {
//             userLogger.error(error.message)
//             throw new InternalServerErrorException(error.message)             
//         }
//     },


//     async  getUser(body:UserBody): Promise<UserResponse|UserDataResponse>{
//         try {
            
//             const user = await this.findOneBy({
//                 username:body.username,
//             });

//             if(!user) {
//                 return new UserResponse("failed","no user found with these data")
//             }

//             const res = new UserDataResponse("success",user)
//             return res
//         } catch (error) {
//             userLogger.error(error.message)
//             throw new InternalServerErrorException(error.message)          
//         }
//     },    

// }