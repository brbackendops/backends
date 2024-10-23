const router = require('express').Router();
const { getAllRecipes ,getRecipe , createRecipe , updateRecipe , createIngredients , createSteps , ingUnderSteps } = require('../controllers/recipe.controller');
const { authenticate } = require('../middlewares/auth');
const upload = require('../multer.config');

router.all('*',authenticate);

router.route('/').get(getAllRecipes);
router.route('/:id').get(getRecipe);
router.route('/create').post(upload.single('image'),createRecipe);
router.route('/update').put(updateRecipe);
router.route('/:id/step/create').post(createSteps);
router.route('/ing/create').post(createIngredients);
router.route('/ing/create').post(createIngredients);
router.route('/step/ing').post(ingUnderSteps);


module.exports = router
