const User = require('../database/models').User;
const UserRepo = require('../repo/user.repo')
const UserService = require('../service/user.service')
const UserController = require('../controller/user.controller')

const router = require('express').Router()

const userrepo = new UserRepo(User)
const userservice = new UserService(userrepo)
const usercontroller = new UserController(userservice)
// console.log(usercontroller.userService.userRepo.userDb)


router.route("/login").post(usercontroller.loginUser.bind(usercontroller))
router.route("/register").post(usercontroller.registerUser.bind(usercontroller))
router.route("/:id").get(usercontroller.getUser.bind(usercontroller))

module.exports = router