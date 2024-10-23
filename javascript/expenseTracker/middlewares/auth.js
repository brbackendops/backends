const jwt = require("jsonwebtoken")
require("dotenv").config()


const authenticate = async (req,res,next) => {
    console.log("hello")
    try {
        if ( req.headers && req.headers.hasOwnProperty("authorization")) {
            let token = req.headers.authorization.split(" ")[1]
            let data  = jwt.verify(token,process.env.SECRET_KEY,(err,decoded) => {
                return decoded
            })
            if (data) {
                req.user = data
                next()
            } else {
                res.status(500).json({
                    "status":"failed",
                    "error": "invalid token found"
                })                   
            }
        } else {
            res.status(500).json({
                "status":"failed",
                "error": "user is not authenticated"
            })            
        }       
    } catch (error) {
        res.status(500).json({
            "status":"failed",
            "error": error.message
        })
    }

}

module.exports = authenticate