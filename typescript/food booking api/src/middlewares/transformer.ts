import { plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { NextFunction , Request , Response } from "express";


export default function TransformerValidation<T>(type:any): ( req: Request, res: Response , next: NextFunction ) => Promise<void> {
    return async (req: Request, res: Response , next: NextFunction): Promise<void> => {
        const dtoObject = plainToClass(type,req.body)
        const errors: ValidationError[] = await validate(dtoObject)

        if ( errors.length > 0 ) {
            res.status(400).json({
                message: 'validation failed',
                error: errors.map((err) => Object.values(err.constraints!)).flat()
            })
        } else {
            req.body = dtoObject
            next()
        }
    }
}