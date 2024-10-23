class TransactionService {
    constructor(transactionrepo,catRepo){
        this.transactionrepo = transactionrepo
        this.catRepo = catRepo
    }


    async CreateTransaction(payload){
        try {
            if (payload.type === undefined) {
                throw new Error("type is a required field")
            }

            if (payload.amount === undefined) {
                throw new Error("amount is a required field")
            }   
            
            if (payload.description === undefined) {
                throw new Error("description is a required field")
            }
            const validTypes = ["income","outcome"]
            if (!validTypes.includes(payload.type.toLowerCase())) {
                throw new Error("this is not valid type , type should be either [outcome,income]")
            }
            const transaction = await this.transactionrepo.Create(payload)
            return {
                status: "success",
                data: transaction
            }
        } catch (error) {
            throw error
        }
    }

    async GetTransaction(id) {
        try {
            const transaction = await this.transactionrepo.Get(id)
            return {
                status: "success",
                data: transaction
            }
        } catch (error) {
            throw error
        }
    }

    async UpdateTransaction(payload,id) {
        // category , date , type , amount , 
        try {
            const transaction = await this.transactionrepo.Get(id)
            if ( payload.category === undefined ){
                payload.category = transaction.category
            } 

            if ( payload.amount === undefined ){
                payload.amount = transaction.amount
            } 

            if ( payload.date === undefined ){
                payload.date = transaction.date
            } 

            if ( payload.type === undefined ){
                payload.type = transaction.type
            }                                     

            const category = await this.catRepo.GetCatByName(payload.category)

            if (category === null || category === undefined) {
                throw new Error("category with name is not found")
            }
            const validTypes = ["income","outcome"]
            if (!validTypes.includes(payload.type.toLowerCase())) {
                throw new Error("this is not valid type , type should be either [outcome,income]")
            }
            const result = await this.transactionrepo.Update(payload,id)
            return {
                status: "sucess",
                message: result
            }
        } catch (error) {
            throw error
        }
    }

    async GetTransactionsUnderCatFilter(catName,type,amountObj) {
        try {
            
            const transactions = await this.transactionrepo.GetAllTransactionsUnderCategoryFilter(catName,type,amountObj)

            return {
                status: "success",
                data: transactions
            }
        } catch (error) {
            throw error
        }
    }

    async GetAllTransactionsUnderCat(catName,page) {
        try {
            const transactions = await this.transactionrepo.GetAllTransactionsUnderCategory(catName,page)
            return {
                status: "success",
                data: transactions
            }            
        } catch (error) {
            throw error
        }
    }

    async DeleteTransaction(id) {
        try {
            const result = this.transactionrepo.Delete(id)
            return {
                status: "sucess",
                message: result
            }
        } catch (error) {
            throw error
        }
    }
}


module.exports = TransactionService