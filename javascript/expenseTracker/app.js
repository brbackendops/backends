const express = require('express');
const cors = require('cors');
const routers = require('./routes');
const errorHandler = require('./middlewares/error');
const pino = require('pino-http')()

module.exports =  async (app) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors({
            origin:"*" // developement
    }))

    // app.use(pino)
    app.use("/users",routers.userRouter)
    app.use("/category",routers.catRouter)
    app.use("/transactions",routers.transactionRouter)
    
    app.get("/",(req,res) => {
        res.status(200).json({
            "status": "success",
            "message": "welcome"
        })
    })


    app.use(errorHandler)
}

