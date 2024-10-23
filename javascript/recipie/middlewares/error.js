const errorWatch = (err,req,res,next) => {
    if ( err != null ){
        next(err)
    }
}


module.exports = errorWatch;