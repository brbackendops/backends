import { MenusDtoCreate, MenusDtoUpdate } from "../../dto";
import Menus from "../../models/Menus.entity";
import MenusRepo from "../../repos/menus/menus_repo";

export default class MenusService {
    private menurepo: MenusRepo;

    constructor(menurepo: MenusRepo) {
        this.menurepo = menurepo;
    }


    async createMenusService(payload: MenusDtoCreate): Promise<Menus> {
        try {
            const menu = await this.menurepo.createMenus(payload)
            return menu
        } catch (error) {
            throw error
        }
    }

    async updateMenusService(id: number , payload: MenusDtoUpdate): Promise<Menus> {
        try {

            const getMenu = await this.menurepo.getOne(id)
            if (!getMenu) {
                throw new Error("menu not found")
            }
            const menu = await this.menurepo.updateMenus(getMenu.id,payload)
            return menu
        } catch (error) {
            throw error
        }
    }

    async getSingleInstanceService(id: number): Promise<Menus> {
        try {
            const menu = await this.menurepo.getOne(id)
            return menu
        } catch (error) {
            throw error
        }
    }

    async getManyService(resId: number): Promise<Menus[]> {
        try {
            const menus = await this.menurepo.getMany(resId)
            return menus
        } catch (error) {
            throw error
        }
    }
}    