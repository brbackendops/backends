
class UserRepo {
    constructor(userdb){
        this.userDb = userdb
    }

    async Create(payload){
        try {
            
            const user = await this.userDb.create(payload)
            return user
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async GetUserById(userId){
        try {
            const user = await this.userDb.findAll({
                where: {
                    id: userId
                }
            })
            return user
        } catch (error) {
            return error
        }
    }
    async GetUserByEmail(userEmail){
        try {
            const user = await this.userDb.findOne({
                where: {
                    email: userEmail
                }
            })
            return user
        } catch (error) {
            return error
        }        
    }
    async UpdateUser(userId,payload){     
        try {
            await this.userDb.update(
                payload,
                {
                    where:{
                        id: userId,
                    }
                }
            )
            return "user details updated successfully"
        } catch (error) {
            return error
        }
    }
    async DeleteUser(userId){
        try {
            await this.userDb.destroy({
                where: {
                    id: userId
                }
            })

            return "user successfully deleted"
        } catch (error) {
            return error
        }           
    }
}

module.exports = UserRepo