import { MenusDtoUpdate } from './../../dto/index';
import { EntityRepository, MikroORM, RequiredEntityData } from "@mikro-orm/postgresql";
import Menus from "../../models/Menus.entity";
import { MenusDtoCreate } from "../../dto";
import RestaurentRepo from "../restaurant/restaurent_repo";


export default class MenusRepo {

    private orm: MikroORM;
    private repo: EntityRepository<Menus>
    private restRepo: RestaurentRepo;

    constructor(orm: MikroORM){
        this.orm = orm;
        this.restRepo = new RestaurentRepo(this.orm)
        this.repo = this.orm.em.getRepository(Menus)
    }


    async createMenus(payload: MenusDtoCreate): Promise<Menus>{
        try {

            const restaurent = await this.restRepo.getRestaurent(payload.restaurent_id)
            if (!restaurent) {
                throw new Error("no restaurent found")
            }

            const objPayload: RequiredEntityData<Menus> = {
                name: payload.name,
                description: payload.description,
                price: payload.price,
                available: payload.available,
                imageUrl: payload.imageUrl,
                restaurent_id: restaurent,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            const mFork = this.orm.em.fork()
            const menu = mFork.create(Menus,objPayload)
            await mFork.persistAndFlush(menu)
            return menu
        } catch (error) {
            throw error
        }
    }

    async updateMenus(id: number , payload: MenusDtoUpdate): Promise<Menus> {
        try {
        
            const menus = await this.orm.em.upsert(Menus,{id:id , ...payload})
            menus.updatedAt = new Date()            
            await this.orm.em.persistAndFlush(menus)
            return menus

        } catch (error) {
          throw error  
        }
    } 

    async getOne(id: number): Promise<Menus> {
        try {
            const menus = await this.orm.em.findOneOrFail(Menus,{id})
            return menus
        } catch (error) {
            throw error
        }
    }

    async getMany(resId: number): Promise<Menus[]> {
        try {
            const menus = await this.orm.em.find(Menus,{ restaurent_id: resId })
            return menus
        } catch (error) {
            throw error
        }
    }
}