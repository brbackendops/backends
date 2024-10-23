const { comparePassword , genToken , hashFunction } = require("../utils/hash.utils")

class UserService {
    constructor(userrepo){
        this.userRepo = userrepo
    }

    async CreateUser(payload){
        try {
            if ( payload.username === undefined ) {
                console.log(payload.username)
                throw new Error("username is missing")
            }

            if ( payload.email === undefined ) {
                throw new Error("email is missing")
            }

            if ( payload.password === undefined ) {
                throw new Error("password is missing")                
            }            

            payload.password = hashFunction(payload.password)
            const user = await this.userRepo.Create(payload)
            return {
                "status": "success",
                "data": user
            }
        } catch (error) {
            throw error
        }
    }

    async GetUser(id) {
        try {
            const user = await this.userRepo.GetUserById(id)
            return {
                "status":"success",
                "data": user,
            }
        } catch (error) {
            throw error
        }
    }

    async LoginUser(payload){
        try {
            if (payload.email === undefined) {
                throw new Error("email required")
            }

            if ( payload.password === undefined ) {
                throw new Error("password required")
            }   
            
            
            const user = await this.userRepo.GetUserByEmail(payload.email)

            if ( user === null || user === undefined ){
                throw new Error("user with this email is not found")
            }
            let passwordok = comparePassword(payload.password , user.password)
            
            if (!passwordok) {
                throw new Error("incorrect password , please try again")
            }

            const userData = {
                id: user.id,
                username: user.username,
                email: user.email
            }

            let token = genToken(userData)

            return {
                "status":"success",
                "data": {
                    "token": token
                }
            }
        } catch (error) {
            throw error
        }
    }
    
}

module.exports =  UserService