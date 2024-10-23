class CategoryController{
    constructor(catservice) {
        this.catservice = catservice
    }

    async CreateHandler(req,res) {
        try {
            console.log(req.body)
            const { name , type } = req.body;
            const payload = {
                name,
                type,
                userId: req.user.id
            }
            const result = await this.catservice.CreateCategory(payload)

            return res.status(201).json(result)
        } catch (error) {
            res.status(500).json({
                "status":"failed",
                "error": error.message
            })
        }
    }

    async GetListHandler(req,res) {
        try {
            
            const result = await this.catservice.GetCategoryLists(req.user.id)
            return res.status(201).json(result)
        } catch (error) {
            res.status(500).json({
                "status":"failed",
                "error": error.message
            })            
        }
    }
}

module.exports = CategoryController