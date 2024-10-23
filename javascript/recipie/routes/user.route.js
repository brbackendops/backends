const router = require('express').Router();
const { getUser , registerUser , loginUser } = require('../controllers/user.controller')
const { authenticate } = require('../middlewares/auth')


router.route('/get').get(authenticate,getUser);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

module.exports = router;