import {model,Schema} from 'mongoose'
import Joi from "joi";
import jwt from 'jsonwebtoken'

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    login:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },

})

userSchema.methods.generateAuthToken=function (user){
    return jwt.sign({_id:user._id},process.env.JWT_PRIVATE_KEY,{expiresIn: '5h'})
}


const User=model('User',userSchema)

function validate(user){
    const userValid=Joi.object({
        name:Joi.string().required(),
        login:Joi.string().required(),
        password:Joi.string().required(),
    })

    return userValid.validate(user)
}
export {User,validate}
