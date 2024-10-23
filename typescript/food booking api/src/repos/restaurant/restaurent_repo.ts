import { RestaurentDtoUpdate } from './../../dto/index';
import { EntityRepository, MikroORM, RequiredEntityData } from "@mikro-orm/postgresql";
import Restaurent from "../../models/Restaurent.entity";
import { RestaurentDtoCreate } from "../../dto";
import UserRepo from "../user/user_repo";

export default class RestaurentRepo {

    private orm: MikroORM;
    private repo: EntityRepository<Restaurent>
    private userrepo: UserRepo;

    constructor(orm:MikroORM){
        this.orm = orm;
        this.userrepo = new UserRepo(this.orm);
        this.repo = this.orm.em.getRepository(Restaurent);
    }

    async createRestaurent(payload: RestaurentDtoCreate): Promise<Restaurent> {
        try {   
            
            const user = await this.userrepo.getUserById(payload.user_id)
            if (!user) {
                throw new Error("user does not exists")
            }

            const transformPayload: RequiredEntityData<Restaurent> = {
                name: payload.name,
                user_id: user,
                city: payload.city,
                country: payload.country,
                imageUrl: payload.imageUrl,
                deliveryPrice: payload.deliveryPrice,
                estimatedDeliveryTime: payload.estimatedDT,
                cuisines: payload.cuisines,
                createdAt: new Date(),
                updatedAt: new Date()                
            };

            const restFork = this.orm.em.fork()
            const restaurent = restFork.create(Restaurent,transformPayload)
            await restFork.persistAndFlush(restaurent)
            return restaurent

        } catch (error) {
            throw error
        }
    }

    async updateRestaurent(id: number , payload: RestaurentDtoUpdate): Promise<Restaurent>{
        try {
            const restaurent = await this.orm.em.upsert(Restaurent,{ id: id , ...payload})
            restaurent.updatedAt = new Date()
            await this.orm.em.persistAndFlush(restaurent)
            return restaurent
        } catch (error) {
            throw error
        }
    }

    async getRestaurent(id: number): Promise<Restaurent> {
        try {
            const restaurent = await this.orm.em.findOneOrFail(Restaurent,{id})
            return restaurent
        } catch (error) {
            throw error
        }
    }
}