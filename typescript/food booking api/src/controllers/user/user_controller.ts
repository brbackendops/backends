import { UserDto, UserDtoLogin, UserDtoUpdate } from '../../dto';
import { UserService } from './../../services/user/user_service';
import { Request , Response } from 'express'

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async CreateUserhandler(req: Request , res: Response) {
        const payload: UserDto = req.body
        try {
            const user = await this.userService.CreateUserService(payload)
            res.status(201).json({
                status: "success",
                data: user
            })
        } catch (err: any) {
            res.status(500).json({
                status: "failed",
                error: err.message
            })
        }
    }

    async LoginUserHandler(req: Request , res: Response ) {
        const payload: UserDtoLogin = req.body;
        try {
            const token = await this.userService.LoginUserService(payload)
            res.status(200).json({
                status: "success",
                token
            })
        } catch (error: any) {
            res.status(500).json({
                status: "failed",
                error: error.message
            })
        }
    }

    async GetUserHandler(req: Request , res: Response) {
        try {
            const id = req.user ? req.user.id : null 
            if ( id === null ) {
                throw new Error("user is not authenticated")
            }
            const user = await this.userService.GetUserService(id)
            res.status(200).json({
                status: "success",
                data: user
            })
        } catch (error: any) {
            res.status(500).json({
                status: "success",
                error: error.message
            })            
        }
    }

    async UpdateUserHandler(req: Request , res: Response) {
        try {
            const payload: UserDtoUpdate = req.body;
            const id: any = req.user?.id
            payload.id = id;
            const resMsg = await this.userService.UpdateUserService(payload)
            res.status(200).json({
                status: "updated",
                message: resMsg
            })
        } catch (error: any) {
            res.status(500).json({
                status: "success",
                error: error.message
            })              
        }
    }

    async PhotoSampleHandler(req: Request , res: Response) {
        try {
            res.status(200).json({
                status: "success",
                data: req.file?.filename
            })
        } catch (error: any) {
            res.status(500).json({
                status: "success",
                error: error.message
            })               
        }
    }

    HomeUserHandler(req: Request , res: Response) {
        try {
            return res.status(200).json({
                status: "success",
                message: "welcome to user api v1"
            })
        } catch (err: any) {
            return res.status(500).json({
                status: "failed",
                error: err.message
            })            
        }
    }
}