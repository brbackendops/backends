import { MenusDtoCreate, MenusDtoUpdate } from "../../dto";
import MenusService from "../../services/menus/menus_service";
import { Request , Response } from 'express'

export default class MenusController {

    private menusService: MenusService;
    constructor(menusService: MenusService){
        this.menusService = menusService
    }


    async GetAllMenusUnderRestaurentHandler(req: Request , res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const resId = parseInt(id)

            const menus = await this.menusService.getManyService(resId)
            res.status(200).json({
                status: "success",
                data: menus
            })            

        } catch (error: any) {
            res.status(500).json({
                status: "failed",
                error: error.message
            })            
        }
    }    

    async GetMenusHandler(req: Request , res: Response): Promise<void> {
        try {
            const { id } = req.params
            const Pid = parseInt(id)

            const menu = await this.menusService.getSingleInstanceService(Pid)

            res.status(200).json({
                status: "success",
                data: menu
            })
        } catch (error: any) {
            res.status(500).json({
                status: "failed",
                error: error.message
            })            
        }
    }

    async CreateMenusHandler(req:Request,res:Response): Promise<void> {
        try {
            const payload: MenusDtoCreate = req.body;

            if (payload.imageUrl !== null || payload.imageUrl !== undefined) {
                payload.imageUrl = `${req.protocol}://${req.headers.host}/media/${req.file?.filename}`
            }

            const menu = await this.menusService.createMenusService(payload)

            res.status(201).json({
                status: "success",
                data: menu
            })

        } catch (error: any) {
            res.status(500).json({
                status: "failed",
                error: error.message
            })
        }
    }


    async UpdateMenusHandler(req: Request , res: Response): Promise<void> {
        try {
            const payload: MenusDtoUpdate = req.body;
            const { id } = req.params;
            const Pid = parseInt(id)

            const menu = await this.menusService.updateMenusService(Pid,payload)
            res.status(200).json({
                status: "success",
                message:"updated sucessfully",
                data: menu
            })

        } catch (error: any) {
            res.status(500).json({
                status: "failed",
                error: error.message
            })            
        }
    }    
}