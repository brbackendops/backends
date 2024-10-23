const User  = require('../database/models').User;
const yup = require('yup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getUser = async(req,res) => {
    try {
        let user = await User.findByPk(req.user.id);
        if (user === null ){
            throw new Error("user with this id does not exist")
        }

        res.status(200);
        return res.json({
            "status": "success",
            data: user
        })
    } catch (error) {
        return res.status(400).json({
            "status": "failed",
            error: error.message
        })        
    }
}

let registerSchema = yup.object({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required()
});
const registerUser = async(req,res) => {
    try {
        let userPayload = req.body;
        userPayload = await registerSchema.validate(userPayload,{
            strict: true
        });

        let user = await User.findOne({
            where: {
                email: userPayload.email
            }
        });
        
        if (user !== null ){
            throw new Error("user already exists")   
        }

        await User.create({
            firstName: userPayload.firstname,
            lastName: userPayload.lastname,
            email: userPayload.email,
            password: userPayload.password
        });

        return res.status(201).json({
            "status":"success",
            data: Object.fromEntries(Object.entries(userPayload).filter(([key,val]) => key != 'password'))
        })

    } catch (error) {
        res.status(400).json({
            "status": "failed",
            error: error.message
        })      
    }
}

let loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
});

const loginUser = async(req,res) => {
    try {
        let loginPayload = req.body;
        loginPayload = await loginSchema.validate(loginPayload,{ strict: true });
        let user = await User.findOne({
            where: {
                email: loginPayload.email
            }
        });

        if ( user === null) throw new Error("user does not exists");
        let is_password_correct = bcrypt.compare(loginPayload.password,user.password);
        if (is_password_correct) {
            let token = jwt.sign(user.dataValues,process.env.SECRET_KEY);
            res.cookie('jit',token,{
                httpOnly: true,
            });
            
            return res.status(200).json({
                "status":"success",
                "message": "login successfull"
            })
        }

        throw new Error("incorrect password")

    } catch (error) {
        res.status(400).json({
            "status": "failed",
            error: error.message,
            trace: error.stack
        })          
    }
}

module.exports = {
    getUser,
    registerUser,
    loginUser
}