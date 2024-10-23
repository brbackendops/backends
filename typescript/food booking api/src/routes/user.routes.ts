import { Router } from "express";
import TransformerValidation from "../middlewares/transformer";
import { UserDto, UserDtoLogin } from "../dto";
import { FactoryForDb } from '../providers/db'
import { UserService } from "../services/user/user_service";
import { UserController } from "../controllers/user/user_controller";
import Authenticate from "../middlewares/auth";
import FileUpload from '../middlewares/multerMiddleware'


const router = Router()

const factoryDb = new FactoryForDb()
const userrepo = await factoryDb.createUserRepo()
const userserive = new UserService(userrepo)
const usercontroller = new UserController(userserive)

router.get("/",Authenticate,usercontroller.GetUserHandler.bind(usercontroller))
router.post("/new",TransformerValidation(UserDto), usercontroller.CreateUserhandler.bind(usercontroller))
router.post("/login",TransformerValidation(UserDtoLogin), usercontroller.LoginUserHandler.bind(usercontroller))
router.post("/update",Authenticate,usercontroller.UpdateUserHandler.bind(usercontroller))
router.post("/file", FileUpload.single("imageFile") ,usercontroller.PhotoSampleHandler.bind(usercontroller))

export default router