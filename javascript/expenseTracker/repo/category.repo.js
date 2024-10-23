const { where } = require("sequelize")

class CategoryRepo {
    constructor(catDb) {
        this.catDb = catDb
    }

   async Create(payload){
    try {
        const cat = await this.catDb.create(payload)
        return cat
    } catch (error) {
        throw error
    }
   }

   async Lists(user_id){
    try {
        const cats = await this.catDb.findAll({
            where:{
                userId: user_id
            }
        })
        return cats
    } catch (error) {
        throw error
    }
   }

   async Update(catId,payload){
    try {
        await this.catDb.update(
            payload,
            {
                where:{
                    id: catId
                }
            }
        )

        return "category updated successfully"
    } catch (error) {
        
    }
   }

   async GetCatById(catId) {
    try {
        const cat = await this.catDb.findOne({
            where: {
                id: catId
            }
        });

        return cat
    } catch (error) {
        throw error
    }
   }

   async GetCatByName(catName) {
    try {
        const cat = await this.catDb.findOne({
            where: {
                name: catName
            }
        });

        return cat
    } catch (error) {
        throw error
    }
   }   

   async Delete(catId){
    try {
        const cat = this.GetCatById(catId)
        if ( cat ) {
            await this.catDb.destroy({
                where:{
                    id: catId
                }
            })

            return "category deleted successfully"
        }

        throw new Error("category not found")
    } catch (error) {
        throw error
    }
   }
}

module.exports = CategoryRepo