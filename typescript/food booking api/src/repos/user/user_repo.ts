import { EntityRepository, MikroORM } from "@mikro-orm/postgresql";
import  User  from "../../models/User.entity"
import { UserDto , UserDtoLogin, UserDtoUpdate } from "../../dto";

export interface UserRepoInterface {
    createUser(payload: UserDto): Promise<User>,
    getUser(email: string): Promise<User>
}

export default class UserRepo implements UserRepoInterface{

    private orm: MikroORM;
    private repo: EntityRepository<User>

    constructor(orm: MikroORM){
        this.orm =  orm
        this.repo = this.orm.em.getRepository(User)
    }

    async createUser(payload: UserDto): Promise<User> {
        const user = this.orm.em.create(User,{
            username : payload.username,
            password : payload.password,
            email: payload.email,
            age: payload.age,
            born: payload.born,
            city: payload.city,
            address: payload.address,
            country: payload.country,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await this.orm.em.persist(user).flush()
        return user
    }

    async getUser(email: string): Promise<User> {
        try {
            const user =  await this.orm.em.findOneOrFail(User,{
                email,
            })
            return user
        } catch (error) {
            throw error
        }
    }

    async updateUser(payload: UserDtoUpdate): Promise<string> {
        try {
            const user = await this.orm.em.upsert(User,payload)
            await this.orm.em.persist(user).flush()
            return "updated successfully"
        } catch (error) {
            throw error
        }
    }

    async getUserById(id: number): Promise<User> {
        try {
            const user:any =  await this.orm.em.findOneOrFail(User,{ id }, {
                exclude: ['password'],
            })
            return user
        } catch (error) {
            throw error
        }
    }    
}