class UserController {
    constructor(userservice){
        this.userService = userservice
    }

    async registerUser(req,res) {
        try {
            const payload = req.body;
            const result = await this.userService.CreateUser(payload)
            console.log(result)
            return res.status(201).json(result)
        } catch (error) {
            return res.status(400).json({
                "status":"failed",
                "error": error.message
            })
        }
    }

    async getUser(req,res){
        try {
            const user_id = req.params.id;
            const result = await this.userService.GetUser(user_id)
            return res.status(200).json(result)
        } catch (error) {
            return res.status(400).json({
                "status":"failed",
                "error": error.message
            })            
        }
    }

    async loginUser(req,res) {
        try {
            const payload = req.body;
            const result = await this.userService.LoginUser(payload)
            return res.status(200).json(result)
        } catch (error) {
            return res.status(400).json({
                "status":"failed",
                "error": error.message
            })               
        }
    }
}

module.exports =  UserController