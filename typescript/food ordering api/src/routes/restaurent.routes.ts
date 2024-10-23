import { Router } from 'express';
import Authenticate from '../middlewares/auth'
import ImageUpload from '../middlewares/multerMiddleware'
import { FactoryForDb } from '../providers/db'
import RestaurentService from '../services/restaurent/restaurent_service';
import RestaurentController from '../controllers/restaurent/restaurent_controller';

const router = Router()

const f = new FactoryForDb()

const resrepo = await f.createRestaurentRepo()
const resService = new RestaurentService(resrepo)
const resController = new RestaurentController(resService)



router.post("/new",Authenticate, ImageUpload.single("imageFile"),resController.createRestaurentHandler.bind(resController))
router.put("/:id/update",Authenticate,ImageUpload.single("imageFile"),resController.updateRestaurentHandler.bind(resController))
router.get("/:id",Authenticate,resController.getRestaurentHandler.bind(resController))



export default router;