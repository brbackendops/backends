const router = require('express').Router();
const CatController = require("../controller/category.controller");
const CatService = require("../service/category.service");
const CatRepo = require("../repo/category.repo");
const Category = require("../database/models").Category;
const authenticateAll = require('../middlewares/auth')

const catrepo = new CatRepo(Category)
const catserv = new CatService(catrepo)
const catcont = new CatController(catserv)

// router.all(authenticateAll)
router.route("/new").post(authenticateAll,catcont.CreateHandler.bind(catcont))
router.route("/").get(authenticateAll,catcont.GetListHandler.bind(catcont))


module.exports = router