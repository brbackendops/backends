import User from "./models/User.entity";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number,
                username: string,
                email: string,
                country: string,
                address: string,
                city: string 
            }
        }
    }
}