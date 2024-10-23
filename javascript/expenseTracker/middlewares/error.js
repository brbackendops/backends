const errorHandler = (err,req,res,next) => {
    res.json({
        "error": err.message,
        "stack": err.stack
    })
}

module.exports = errorHandler