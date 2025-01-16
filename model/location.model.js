import {model,Schema} from 'mongoose'
import Joi from "joi";
import jwt from 'jsonwebtoken'

const locationSchema=new Schema({
    address:{
        type:String,
        required:true
    },
    image: {
        type: Schema.ObjectId,
        ref: 'Media',
    },
    locationImage:{
        type: Schema.ObjectId,
        ref: 'Media',
    },
    video:{
        type: Schema.ObjectId,
    },
    screenPixel:{
        type:String,
        required:true
    },
    fromHour:{
        type:String,
        required:true
    },
    toHour:{
        type:String,
        required:true
    },
    passportID:{
        type:String,
        required:true
    },
    region:{
        type:String,
        required:true
    },
},{
    timestamps:true
})




const Location=model('Location',locationSchema)

function validate(location){
    const locationValid=Joi.object({
        address:Joi.string().required(),
        image:Joi.string().empty(""),
        locationImage:Joi.string().empty(""),
        video:Joi.string().empty(""),
        screenPixel:Joi.string().required(),
        fromHour:Joi.string().required(),
        toHour:Joi.string().required(),
        passportID:Joi.string().required(),
        region:Joi.string().required(),
    })

    return locationValid.validate(location)
}
export {Location,validate}
