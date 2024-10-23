import multer from 'multer';
import path from 'node:path';

const ImageStorage = multer.diskStorage({
    destination: function(req,file,cb){
        console.log("path",path.join(process.cwd() , "public/images"))
        cb(null,path.join(process.cwd() , "public/images"))
    },
    filename: function(req,file,cb) {
        cb(null,file.originalname)
    }
})


export default multer({ storage: ImageStorage , limits: {
    fileSize: 5 * 1024 * 1024,
} })