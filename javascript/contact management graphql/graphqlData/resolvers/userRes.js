const User = require("../../database/models").User;
const { ApolloServerErrorCode } = require("@apollo/server/errors");
const { GraphQLError } = require('graphql');
const bcrypt = require("bcrypt");
const { QueryError } = require("sequelize");
const jwt = require('jsonwebtoken');
const { GraphQLUpload } = require("graphql-upload");
const path = require('path')
const fs = require('fs')
require("dotenv").config()

const streamToBuffer = (stream) => {
    const chunks = []
    return new Promise((resolve,reject) => {
        stream.on("data", (chunk) => chunks.push(chunk))
        stream.on("error", (error) => reject(error))
        stream.on("end", () => resolve(Buffer.concat(chunks)) )
    })
}

const saveToFile = async (file , url) => {
    
    const Dir = path.join(process.cwd(),"/public/images/")
    if (!fs.existsSync(Dir)) {
        throw new Error("directory does not exists")
    }

    const imageBuffer = await streamToBuffer(file.createReadStream())
    await fs.promises.writeFile(Dir + `${file.filename}`, imageBuffer)
    return url+`images/${file.filename}`
}

const userQl = {
    Query:{
        async getAllUsers(){
            try {
                const users = await User.findAll()
                
                return users
            } catch (error) {
                throw new GraphQLError(error.message,{
                    extensions: {
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                    }
                })
            }
        },

        async getUser(_,{id},ctx,info){
            
            try {
                const user = await User.findOne({
                    where:{
                        id
                    }
                });
                if (!user) {
                    throw new GraphQLError("user not found",{
                        extensions:{
                            code: ApolloServerErrorCode.BAD_REQUEST
                        }
                    })                    
                }
                return user
            } catch (error) {
                throw new GraphQLError(error.message,{
                    extensions:{
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR
                    }
                })
            }
        }
    },
    Upload: GraphQLUpload,
    Mutation:{
        createUser: async(_,{ userBody:{ name , email , password , photo } },ctx,info) => {
            console.log(photo)
            try {
                const hpassword = bcrypt.hashSync(password,10)
                const payload = {
                    name,
                    email,
                    password: hpassword,
                    photo,
                }
                await User.create(payload)
                return "user registered successfully"
            } catch (error) {
                if ( error.code === '23505') {
                    throw new GraphQLError("user with this email already exists",{
                        extensions:{
                            code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR
                        }
                    })                    
                }                
                throw new GraphQLError(error.message,{
                    extensions:{
                        code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR
                    }
                })
            }
        },
        singleFileUpload: async(_,{ file },ctx,info) => {
            
            const url = `${ctx.protocol}:${ctx.host}/`
            const filepath = await saveToFile(file.file, url)

            return {
                url: filepath
            }
        },
        loginUser: async (_,{userBody: { email , password } },ctx,info) => {
            try {
                const user = await User.findOne({
                    where: {
                        email
                    }
                });
                if (!user) {
                    throw new Error("user not found")
                }

                const ok = bcrypt.compareSync(password,user.password)
                if(!ok) {
                    throw new Error("incorrect password found")
                }

                const userP = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                }

                let token = jwt.sign(userP,process.env.KEY,{
                    expiresIn: 2700
                });

                return {
                    "status": "success",
                    "data": {
                        "token": token
                    }
                }

            } catch (error) {
                throw new GraphQLError(error.message,{
                    extensions:{
                        code:ApolloServerErrorCode.INTERNAL_SERVER_ERROR
                    }
                })
            }
        }
    }
}

module.exports = userQl