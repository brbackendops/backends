const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = async(req,res,next) => {
    console.log("Checking for JWT token...");
    try {
        
        if (req.cookies && req.cookies['jit']) {
            let token = req.cookies['jit'];
            let user = jwt.verify(token,process.env.SECRET_KEY);
            req.user = user;
            console.log("JWT token verified...");
            next()
        } else {
            throw new Error("user is not authenticated")
        }

    } catch (error) {
        return res.status(401).json({
            "status": "failed",
            "error": error
        })
    }
}


module.exports = {
    authenticate,
}