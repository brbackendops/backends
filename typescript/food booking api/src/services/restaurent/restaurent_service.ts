import { RestaurentDtoCreate, RestaurentDtoUpdate } from "../../dto";
import Restaurent from "../../models/Restaurent.entity";
import RestaurentRepo from "../../repos/restaurant/restaurent_repo";


export default class RestaurentService {
    private resrepo: RestaurentRepo;
    constructor(resspo: RestaurentRepo) {
        this.resrepo = resspo;
    }


    async createRestaurentService(payload: RestaurentDtoCreate): Promise<Restaurent> {
        try {            
            const restaurent = await this.resrepo.createRestaurent(payload)
            return restaurent
        } catch (error: any) {
            throw error
        }
    }

    async updateRestaurentService(id: number , payload: RestaurentDtoUpdate): Promise<Restaurent> {
        try {
            const resObj = await this.resrepo.getRestaurent(id)
            if (!resObj) {
                throw new Error("object not found")
            }
            const restaurent = await this.resrepo.updateRestaurent(resObj.id,payload)
            return restaurent
        } catch (error) {
            throw error
        }
    }

    async getRestaurentService(id: number): Promise<Restaurent> {
        try {
            const restaurent = await this.resrepo.getRestaurent(id)
            return restaurent
        } catch (error) {
            throw error
        }
    }
}