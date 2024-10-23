const { Op } = require("sequelize")

class TransactionRepo {
    constructor(tranDb){
        this.tranDb = tranDb
    }


    async Create(payload){
        try {
            const transaction = await this.tranDb.create(payload)
            return transaction
        } catch (error) {
            throw error
        }
    }

    async Get(id){
        try {
            const transaction = await this.tranDb.findOne({
                where:{
                    id
                }
            })
            return transaction
        } catch (error) {
            throw error
        }
    }


    async Update(payload,id){
        try {
            await this.tranDb.update(
                payload,
                {
                    where:{
                        id
                    }
                }
            )
            return "transaction updated successfully"
        } catch (error) {
            throw error
        }
    }

    async GetAllTransactionsUnderCategory(catName,page) {
        try {
            let pagelimit = 10
            let offset = (page - 1) * pagelimit

            const transactions = await this.tranDb.findAll({
                where:{
                    category: {
                        [Op.eq]: catName
                    },
                },
                limit:pagelimit,
                offset: offset,
                order:[["createdAt","DESC"]]
            })

            return transactions    

        } catch (error) {
            throw error
        }
    }

    async GetAllTransactionsUnderCategoryFilter(catName,type,amountObj){
        try {
            let transactions = []
            if ( type === undefined && amountObj.amount === undefined && amountObj.amount_search === undefined) {
                transactions = await this.tranDb.findAll({
                    where:{
                        category: {
                            [Op.eq]: catName
                        }
                    }
                })
                return transactions
            }

            if ( type !== undefined && amountObj.amount === undefined && amountObj.amount_search === undefined ) {
                transactions = await this.tranDb.findAll({
                    where:{
                        category: {
                            [Op.eq]: catName
                        },
                        type: {
                            [Op.eq]: type
                        }
                    }
                })
                return transactions                
            }

            if ( type === undefined && amountObj.amount !== undefined && amountObj.amount_search === undefined ) {
                transactions = await this.tranDb.findAll({
                    where:{
                        category: {
                            [Op.eq]: catName
                        },
                        amount: {
                            [Op.eq]: amountObj.amount
                        }
                    }
                })
                return transactions                
            }   
            
            if ( type === undefined && amountObj.amount !== undefined && amountObj.amount_search !== undefined ) {
                if( amountObj.amount_search == "greater" ){
                    transactions = await this.tranDb.findAll({
                        where:{
                            category: {
                                [Op.eq]: catName
                            },
                            amount: {
                                [Op.gt]: amountObj.amount
                            }
                        }
                    })
                    return transactions                
                } 

                transactions = await this.tranDb.findAll({
                    where:{
                        category: {
                            [Op.eq]: catName
                        },
                        amount: {
                            [Op.lt]: amountObj.amount
                        }
                    }
                })
                return transactions                  
            }              


            if ( amountObj.amount_search === "greater" ){
                transactions = await this.tranDb.findAll({
                    where:{
                        category: {
                            [Op.eq]: catName
                        },
                        amount: {
                            [Op.gt]: amountObj.amount
                        }
                    }
                })
    
                return transactions             
            }

            transactions = await this.tranDb.findAll({
                where:{
                    category: {
                        [Op.eq]: catName
                    },
                    amount: {
                        [Op.lt]: amountObj.amount
                    }
                }
            })

            return transactions                 
            
        } catch (error) {
            throw error
        }
    }

    async Delete(id){
        try {
            await this.tranDb.destroy({
                where:{
                    id
                }
            })
            return "transaction deleted successfully"
        } catch (error) {
            throw error
        }
    }
}

module.exports = TransactionRepo