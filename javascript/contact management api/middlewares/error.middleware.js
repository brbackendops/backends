const errorMiddleware = (err,req,res,next) => {
    let statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode) {
        case 500:
            res.json({
                "code": 500,
                "status": "failed",
                "message": err.message        
            });
            break
        default:
            break
    }

    res.json({
        "code": 400,
        "status": "failed",
        "message": err.message,
        "stackTrace": err.stack
    });
}


module.exports = errorMiddleware;