const models  = require('../database/models');
const {Op} = require("sequelize")
const yup = require('yup');

const getAllRecipes = async(req,res) => {
    try {
        
        let recipes = await models.Recipe.findAll({
            where: {
                userId: {
                    [Op.eq]: req.user.id
                }
            }
        });
        return res.status(200).json({
            "status":"success",
            "data": recipes
        })

    } catch (error) {
        res.status(400).json({
            "status": "failed",
            "error": error
        })
    }    
}

const getRecipe = async(req,res) => {
    let { id } = req.params;
    try {

        let is_found = await models.Recipe.findByPk(id);
        if (!Boolean(is_found)) {
            throw new Error("recipe not found")         
        }

        let recipe = await models.Recipe.findOne({
            where: {
                id
            },
            include: [
                {
                    model: models.Steps,
                    required: true,
                    alias:"steps"
                },
                {
                    model: models.Ingredients,
                    required: true,
                    alias:"ingredients"
                }
            ]
        });
        
        if ( recipe === null ){
            return res.status(200).json({
                "status": "success",
                "data": []
            })
        }
        res.status(200).json({
            "status": "success",
            "data": recipe
        })

    } catch (error) {
        res.status(400).json({
            "status": "failed",
            "error": error.message
        })
    }
};

const RecipeSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    image: yup.string().required(),
    userId: yup.number().required()
});

const createRecipe = async(req,res) => {
    try {
        recipePayload = {...req.body, "userId": req.user.id, image: `http://${req.headers.host}/public/images/${encodeURIComponent(req.file.filename)}`}

        recipePayload = await RecipeSchema.validate(recipePayload);
        console.log(recipePayload)
        await models.Recipe.create(recipePayload);
        
        res.status(201).json({
            "status": "success",
            "data":  recipePayload
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            "status": "failed",
            "error": error
        })        
    }
};


const updateRecipe = async(req,res) => {

};

const stepSchema = yup.object({
    stepNumber: yup.number().required(),
    title: yup.string().required(),
    instruction: yup.string().required(),
    recipeId: yup.number().required()
});

const createSteps = async(req,res) => {
    try {

        let { id } = req.params;
        let recipe = await models.Recipe.findByPk(id);
        if (recipe === null ) throw new Error("recipe not found");

        let stepCreate = await stepSchema.validate({ recipeId: id , ...req.body});
        await models.Steps.create(stepCreate);
    
        res.status(201).json({
            "status": "success",
            "data":  stepCreate
        })

    } catch (error) {
        res.status(400).json({
            "status": "failed",
            "error": error
        })        
    }

};

const ingredientsSchema = yup.object({
    stepId: yup.number().required(),
    recipeId: yup.number().required(),
    title: yup.string().required()
})
const createIngredients = async(req,res) => {
    try {
        
        const ingPayload = await ingredientsSchema.validate(req.body)
        const recipe = await models.Recipe.findByPk(ingPayload.recipeId)
        if ( recipe === null ) {
            throw new Error("recipe not found")
        }
        const step = await models.Steps.findByPk(ingPayload.stepId)
        if ( step === null ){
            throw new Error("step not found")
        }

        await models.Ingredients.create(ingPayload)
        return res.status(201).json({
            "status":"success",
            "data": ingPayload
        })

    } catch (error) {
        res.status(400).json({
            "status": "failed",
            "error": error.message
        })           
    }
};


const ingUnderStepSchema = yup.object({
    stepId: yup.number().required()
})

const ingUnderSteps = async(req,res) => {
    try {
        const ingStepSchema = await ingUnderStepSchema.validate(req.body)

        const step = await models.Steps.findByPk(ingStepSchema.stepId)
        if ( step === null ){
            throw new Error("step not found")
        }

        let ings = await models.Ingredients.findAll({
            where:{
                stepId: {
                    [Op.eq]: ingStepSchema.stepId
                }
            }
        })

        return res.status(201).json({
            "status":"success",
            "data": ings
        })

    } catch (error) {
        res.status(400).json({
            "status": "failed",
            "error": error.message
        })           
    }    
}

module.exports = {
    getAllRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    createSteps,
    createIngredients,
    ingUnderSteps
}