const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const hashFunction = (plainText) => {
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(plainText,salt)
    return hashedPassword
}

const comparePassword = (pPassword,hPassword) => {
    return bcrypt.compareSync(pPassword,hPassword)
}

const genToken = (payload) => {
    return jwt.sign(payload,process.env.SECRET_KEY,{
        expiresIn: "30m"
    })
}

module.exports = {
    hashFunction,
    comparePassword,
    genToken
}