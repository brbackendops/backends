const {
    PrismaClient
} = require('@prisma/client');
const {
    join
} = require('@prisma/client/runtime/library');
const Joi = require('joi');

const pclient = new PrismaClient();

const getContacts = async (req, res) => {

    let contacts = await pclient.contact.findMany({
        where: {
            user_id: req.user.id
        },
        select: {
            "name": true,
            "email": true
        }
    });

    return res.status(200).json({
        "code": 200,
        "status": "successfull",
        "data": contacts
    })
};

const contactSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
        }).required(),
});
const createContact = async (req, res) => {

    try {
        const payload = await contactSchema.validateAsync(req.body);

        let user = await pclient.user.findFirst({
            where: {
                id: req.user.id
            },
        });

        if (user === null) {
            return res.status(400).json({
                "code": 400,
                "status": "failed",
                "message": "user not found"
            })
        }

        let is_exists = await pclient.contact.findFirst({
            where: {
                email: payload.email
            },
        });

        if (is_exists) {
            return res.status(400).json({
                "code": 400,
                "status": "failed",
                "message": "contact already exists"
            })
        }

        await pclient.contact.create({
            data: {
                ...payload,
                user_id: req.user.id
            }
        });

        return res.status(201).json({
            "code": 201,
            "status": "success",
            "message": "contact successfully created"
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            "code": 400,
            "status": "failed",
            "error": err.message
        })
    }

};

const ContactUpdateSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50),
    email: Joi.string()
        .email({
            minDomainSegments: 2
        })
});
const updateContact = async (req, res) => {

    try {
        
        const id = parseInt(req.params.id)
        const payload = await ContactUpdateSchema.validateAsync(req.body);
        if (payload.name !== null) {

            await pclient.contact.update({
                where: {
                    id
                },
                data: {
                    name: payload.name,
                }
            })
        } else if (payload.email != null) {
            await pclient.contact.update({
                where: {
                    id
                },
                data: {
                    email: payload.email
                }
            })
        } else {
            await pclient.contact.update({
                where: {
                    id
                },
                data: {
                    name: payload.name,
                    email: payload.email
                }
            })            
        }

        return res.status(200).json({
            "code": 200,
            "status": "successfull",
            "message": "successfully updated"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            "code": 400,
            "status": "failed",
            "error": error.message
        })
    }

}

const deleteContact = async(req,res) => {
    try {
        const id = parseInt(req.params.id);
        await pclient.contact.delete({
            where: {
                id
            }
        });

        return res.status(200).json({
            "code": 200,
            "status": "successfull",
            "message": "successfully deleted"        
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            "code": 400,
            "status": "failed",
            "error": error.message
        })
    }
}


module.exports = {
    getContacts,
    createContact,
    updateContact,
    deleteContact
}