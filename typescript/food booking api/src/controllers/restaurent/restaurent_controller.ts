import { Request , Response } from 'express';
import RestaurentService from "../../services/restaurent/restaurent_service";
import { RestaurentDtoCreate, RestaurentDtoUpdate } from '../../dto';


export default class RestaurentController {
    
    private restService: RestaurentService;
    constructor(restService: RestaurentService){
        this.restService = restService;
    }


    async createRestaurentHandler(req: Request , res: Response) {
        try {
            const payload: RestaurentDtoCreate = req.body;
            payload.user_id = req.user?.id!;
            
            if (req.file !== null || req.file !== undefined) {
                payload.imageUrl = `${req.protocol}://${req.headers.host}/media/${req.file?.filename}`
            }

            payload.cuisines = JSON.parse(String(payload.cuisines))
            const restaurent = await this.restService.createRestaurentService(payload)
            res.status(201).json({
                status: "success",
                data: restaurent
            })
        } catch (error: any) {
            res.status(500).json({
                status: "failed",
                error: error.message
            })
        }
    }

    async updateRestaurentHandler(req:Request,res: Response){
        try {
            const payload: RestaurentDtoUpdate = req.body;
            const { id } = req.params
            const resId: number = parseInt(id)

            if (req.file !== null || req.file !== undefined) {
                payload.imageUrl = `${req.protocol}://${req.headers.host}/media/${req.file?.filename}`
            }

            const restaurentObject = await this.restService.updateRestaurentService(resId,payload)
            res.status(200).json({
                status: "success",
                message: "updated successfully",
                data: restaurentObject
            })
        } catch (error: any) {
            res.status(500).json({
                status: "failed",
                error: error.message
            })            
        }
    }

    async getRestaurentHandler(req: Request , res: Response){
        try {
            let { id } = req.params;

            const resId: number = parseInt(id)
            const restaurent = await this.restService.getRestaurentService(resId)
            res.status(200).json({
                status: "success",
                data: restaurent
            })
        } catch (error: any) {
            res.status(500).json({
                status: "failed",
                error: error.message
            })            
        }
    }
}