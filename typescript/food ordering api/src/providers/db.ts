import { MikroORM } from "@mikro-orm/postgresql";
import DbConfig from '../mikro-orm.conifg'
import UserRepo from "../repos/user/user_repo";
import RestaurentRepo from "../repos/restaurant/restaurent_repo";
import MenusRepo from "../repos/menus/menus_repo";



export class FactoryForDb {

    private db: MikroORM

    async makeDb(): Promise<void> {
        this.db =  await MikroORM.init(DbConfig)
    }

    async createUserRepo(): Promise<UserRepo> {
        await this.makeDb()
        return new UserRepo(this.db)
    }

    async createRestaurentRepo(): Promise<RestaurentRepo> {
        await this.makeDb()
        return new RestaurentRepo(this.db)
    }

    async createMenusRepo(): Promise<MenusRepo> {
        await this.makeDb()
        return new MenusRepo(this.db)
    }
}