class TransactionController {
    constructor(transactionservice){
        this.transactionservice = transactionservice;
    }


    async CreateTransactionHandler(req,res) {
        try {
            const payload = req.body;
            payload.userId = req.user.id
            const result = await this.transactionservice.CreateTransaction(payload)
            res.status(201).json(result)            
        } catch (error) {
            res.status(500).json({
                "status": "failed",
                "error": error.message
            })
        }
    }

    async UpdateTransactionHandler(req,res) {
        try {
            
            const payload = req.body;
            
            const id = parseInt(req.params.id)
            const result = await this.transactionservice.UpdateTransaction(payload,id)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({
                "status": "failed",
                "error": error.message
            })            
        }
    }

    async TransactionsListUnderCategoryFilter(req,res) {
        try {
            const amount = req.query.amount
            const amount_search = req.query.amount_search
            const amountObj = {
                amount,
                amount_search
            }
            const type = req.query.type

            
            const result = await this.transactionservice.GetTransactionsUnderCatFilter(req.params.cat_name,type,amountObj)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({
                "status": "failed",
                "error": error.message
            })              
        }
    }


    async TransactionsListUnderCategory(req,res) {
        try {
            let pageNo = req.query.page
            if ( pageNo === undefined) pageNo = 1;
            const result = await this.transactionservice.GetAllTransactionsUnderCat(req.params.cat_name,pageNo)
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({
                "status": "failed",
                "error": error.message
            })              
        }
    }    

    async DeleteTransaction(req,res) {
        try {
            const result = await this.transactionservice.DeleteTransaction(parseInt(req.params.id))
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json({
                "status": "failed",
                "error": error.message
            })                
        }
    }
}

module.exports = TransactionController