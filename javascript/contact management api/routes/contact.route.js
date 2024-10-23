const router = require('express').Router();
const authenticate = require('../middlewares/auth.middleware');
const { getContacts , createContact , updateContact , deleteContact } = require('../controllers/contact.route');
router.use(authenticate);


router.route('/').get(getContacts);
router.route('/create').post(createContact);
router.route('/update/:id').post(updateContact);
router.route('/delete/:id').post(deleteContact);

module.exports = router