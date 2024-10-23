const multer = require('multer');

const storageEngine  = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./public/images/')
    },
    filename: (req,file,cb) => {
        cb(null,`${Date.now()}--${file.originalname}`)
    }
});

module.exports = multer({
    storage: storageEngine,
    limits: {
        fileSize: 10000000
    }
});