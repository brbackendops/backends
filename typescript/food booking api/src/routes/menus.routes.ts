import { Router } from 'express'
import Authenticate from '../middlewares/auth'
import ImageUpload from '../middlewares/multerMiddleware'
import { FactoryForDb } from '../providers/db'
import MenusService from '../services/menus/menus_service'
import MenusController from '../controllers/menus/menus_controller'

const router = Router()

const f = new FactoryForDb()
const menurepo = await f.createMenusRepo()
const menuservice = new MenusService(menurepo)
const menuscontroller = new MenusController(menuservice)

router.get("/:id",Authenticate,menuscontroller.GetMenusHandler.bind(menuscontroller))
router.get("/:id/menus",Authenticate,menuscontroller.GetAllMenusUnderRestaurentHandler.bind(menuscontroller))
router.post("/create",Authenticate,ImageUpload.single("imageFile"), menuscontroller.CreateMenusHandler.bind(menuscontroller))
router.put("/:id/update",Authenticate,menuscontroller.UpdateMenusHandler.bind(menuscontroller))


export default router