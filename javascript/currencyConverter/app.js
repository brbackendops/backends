const express = require('express');
const rateLimiter = require('express-rate-limit');
const axios = require('axios');
const app = express()

const rateLimit = rateLimiter({
    windowMs: 10 * 60 * 1000,
    max: 100,
})

app.use(rateLimit)
app.use(express.json())

app.post("/curreny/convert", async (req,res) => {
    const { from , to , amount } = req.body

    if (req.headers['content-length'] == 0){
        return res.status(400).json({
            status: "failed",
            message: "no data included in request , expecting from , to , amount"
        })
    }

    const url = process.env.API_URL + `/pair/${from}/${to}/${amount}`
    const result = await axios.get(url)
    if ( result.status != 200) {
        return res.status(500).json({
            status: "failed",
            message: "something failed !"
        })    
    }

    return res.status(200).json({
        status: "success",
        data: {
            "result": result?.data?.conversion_result
        }
    })
})



module.exports = app