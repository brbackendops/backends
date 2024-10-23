const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');


async function validate(req,res,next) {

    if ( !req.headers.hasOwnProperty('cookie') ) {

        return res.status(400).json({
            "code": 400,
            "status": "failed",
            "message": "user is not logged in"
        })
    }
    let user_obj = jwt.verify(req.headers.cookie.split('=')[1], process.env.SECERET_KEY);
    console.log(user_obj)
    req.user = user_obj;
    next()
}

module.exports = validate