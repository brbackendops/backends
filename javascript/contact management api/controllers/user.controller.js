const Joi = require('joi');
const bcrypt = require('bcrypt');
const {
    PrismaClient
} = require('@prisma/client');
const Cookies = require('cookies');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const pclient = new PrismaClient();

const requestSchema = Joi.object({
    username: Joi.string()
        .min(5)
        .max(50)
        .required(),
    password: Joi.string()
        .required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'net']
            }
        }).required()
});

const userRegisterHand = async (req, res) => {

    try {
        const obj = await requestSchema.validateAsync(req.body)
        console.log(obj)
        const salt = bcrypt.genSaltSync(10);
        obj.password = bcrypt.hashSync(obj.password, salt)

        await pclient.user.create({
            data: obj
        });
        return res.status(201).json({
            "code": 201,
            "status": "successfull",
            "data": obj
        })

    } catch (err) {
        return res.status(400).json({
            "code": 400,
            "status": "failed",
            "message": err.message
        })
    }

}



const loginSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(50)
        .required(),
    password: Joi.string()
        .required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: {
                allow: ['com', 'net']
            }
        }).required()
});

const userLoginHand = async (req, res) => {

    try {
        const loginPayload = await loginSchema.validateAsync(req.body);
        let cookies = new Cookies(req,res);
        let user = await pclient.user.findUnique({
            where: {
                email: loginPayload.email
            },
        });

        const is_ok = bcrypt.compareSync(loginPayload.password, user.password);
        if (!is_ok) {

            return res.status(400).json({
                "code": 400,
                "status": "failed",
                "message": "incorrect password"
            })

        }

        let token = jwt.sign(user,process.env.SECERET_KEY,{
            expiresIn: "10m"
        })

        cookies.set("token",token)
        if (user != null) {
            return res.status(200).json({
                "code": 200,
                "status": "successfull",
                "data": Object.fromEntries(Object.entries(user).filter(([key]) => key != "password"))
            })
        }


        return res.status(404).json({
            "code": 404,
            "status": "failed",
            "message": "user with this email does not exist"
        })

    } catch (error) {
        //console.log(error)
        return res.status(400).json({
            "code": 400,
            "status": "failed",
            "message": error.message
        })
    }

};

module.exports = {
    userRegisterHand,
    userLoginHand
}