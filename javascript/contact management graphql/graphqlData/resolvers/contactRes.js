const models = require('../../database/models')
const { GraphQLError } = require('graphql');
const { ApolloServerErrorCode } = require('@apollo/server/errors');
const path = require('path')
const process = require('process')

const contactQl =  {
    Query: {
        getAllContacts: async () => {
            try {
                let contacts = await models.Contact.findAll()
                console.log(contacts)
                if ( contacts.length === 0) {
                    return new GraphQLError("contacts are empty",{
                        extensions: {
                            code: ApolloServerErrorCode.BAD_REQUEST
                        }
                    })                    
                }
                return contacts                
            } catch (error) {
                throw new GraphQLError(error,{
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR
                    }
                })
            }
        },
        // getFavours: async () => {
            
        //     try {
        //         let favoredContacts = await models.Favourites.findByPk(1);
        //         return await favoredContacts.getContacts()
        //     } catch (error) {
        //         throw new GraphQLError(error,{
        //             extensions: {
        //                 code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR
        //             }
        //         })                
        //     }
        // }     
    },
    Mutation: {
        createContact: async(_,{ContactInput:{ name , email, image }},ctx,info) => {
            const cnt = await models.Contact.findOne({
                where: {
                    email
                }
            })

            if ( cnt != null ) {
                return "contact already exists"
            }
            
            // let rand = `Date.now()-Math.round(Math.random() * 1E9)
            // path.join(process.cwd() + `/public/images/${image.filename}-${)}`)
            payload = {
                name,
                email,
                photo: image
            }
            await models.Contact.create(payload)
            return "contact created successfully"
        },
        updateContact: async(_,{ contactId ,  ContactUpdate: { name , email , photo } },ctx,info) => {
            try {

                let contact = await models.Contact.findByPk(contactId)
                if (!contact) {
                    return "contact does not exists"
                }

                if ( name === null ) {
                    await contact.update({ email , photo})
                } else if ( email === null ){
                    await contact.update({ name , photo})
                } else if ( photo === null ) {
                    await contact.update({ name , email })                    
                } else {
                    await contact.update({name,email,photo})
                }
                return "contact updated successfully"
            } catch (error) {
                throw new GraphQLError(error,{
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR
                    }
                })                
            }
        },

        // addToFavourites: async(_,{ contactId,favId },ctx,info) => {
        //     try {
        //         //console.log(contact)
        //         let payload = {
        //             favId,
        //         }

        //         await models.Contact.update(payload,{
        //             where: {
        //                 id: contactId
        //             }
        //         });
                
        //         return "successfully added to favourites"
        //     } catch (error) {
        //         throw new GraphQLError(error,{
        //             extensions: {
        //                 code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR
        //             }
        //         })                   
        //     }
        // }
    }
}

module.exports = contactQl