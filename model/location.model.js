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
        required: true
    },
    locationImage:{
        type: Schema.ObjectId,
        ref: 'Media',
        required: true
    },
    video:{
        type: Schema.ObjectId,
        ref: 'Media',
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
},{
    timestamps:true
})




const Location=model('Location',locationSchema)

function validate(location){
    const locationValid=Joi.object({
        address:Joi.string().required(),
        image:Joi.string().required(),
        locationImage:Joi.string().required(),
        video:Joi.string(),
        screenPixel:Joi.string().required(),
        fromHour:Joi.string().required(),
        toHour:Joi.string().required(),
    })

    return locationValid.validate(location)
}
export {Location,validate}
