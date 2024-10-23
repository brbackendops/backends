const router = require('express').Router();
const CatRepo = require("../repo/category.repo");
const TransactionService = require('../service/transaction.service');
const TransactionRepo = require('../repo/transaction.repo');
const TransactionController = require("../controller/transaction.controller")
const Category = require("../database/models").Category;
const Transaction = require("../database/models").Transaction;
const authenticateAll = require('../middlewares/auth')


const transactionrepo = new TransactionRepo(Transaction)
const catrepo = new CatRepo(Category)
const transactionservice = new TransactionService(transactionrepo,catrepo)
const transactioncontroller = new TransactionController(transactionservice)


// router.all(authenticateAll)
router.route("/new").post(authenticateAll,transactioncontroller.CreateTransactionHandler.bind(transactioncontroller))
router.route("/:id").patch(authenticateAll,transactioncontroller.UpdateTransactionHandler.bind(transactioncontroller))
router.route("/lists/filter/:cat_name").get(authenticateAll,transactioncontroller.TransactionsListUnderCategoryFilter.bind(transactioncontroller))
router.route("/lists/:cat_name").get(authenticateAll,transactioncontroller.TransactionsListUnderCategory.bind(transactioncontroller))


module.exports = router