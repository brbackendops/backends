import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request , Response , NextFunction } from 'express';
import "dotenv/config";

export default async function(req:Request , res:Response , next: NextFunction) {
    try {
        
        if ( req.headers && req.headers.authorization ) {
            const token = req.headers.authorization.split(' ')[1]
            const data:any = await jwt.verify(token,process.env.SECRET_KEY!)
            if (!data) {
                return res.status(401).json({
                    "status": "failed",
                    "error": "invalid token"                    
                })
            }
            req.user = data;
            next()
        } else {
            return res.status(401).json({
                "status": "failed",
                "error": "user not authentocated"                    
            })            
        }

    } catch (error) {
        res.status(401).json({
            "status": "failed",
            "error": "invalid token"
        })
    }
}