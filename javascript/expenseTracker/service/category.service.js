
class CategoryService {
    constructor(catrepo) {
        this.catrepo = catrepo
    }

    async CreateCategory(payload) {
        try {
            const validTypes = ["income","outcome"]
            if (payload.name == undefined) {
                throw new Error("name is required")
            } 

            if (payload.type == undefined) {    
                throw new Error("name is required")
            }

            if (!validTypes.includes(payload.type.toLowerCase())) {
                throw new Error("type is not allowed")
            }
            const cat = await this.catrepo.Create(payload)
            return {
                "status":"success",
                "data": cat
            }
        } catch (error) {
            throw error
        }
    }

    async GetCategoryLists(user_id) {
        try {
            const cats = await this.catrepo.Lists(user_id)
            return {
                "status":"success",
                "data": cats
            }
        } catch (error) {
            throw error
        }
    }

    async UpdateCategory() {
        try {
            
        } catch (error) {
            throw error
        }
    }
}

module.exports = CategoryService