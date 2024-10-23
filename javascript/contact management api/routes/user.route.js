const router = require('express').Router();



// user
const { userRegisterHand , userLoginHand } = require('../controllers/user.controller')
router.route('/register').post(userRegisterHand);
router.route('/login').post(userLoginHand);



module.exports = router