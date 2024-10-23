const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
    },
    isActive:{
        type: String
    }
})

module.exports = mongoose.model('users',userSchema)