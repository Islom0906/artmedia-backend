import {model,Schema} from 'mongoose'
import Joi from "joi";
import jwt from 'jsonwebtoken'

const dayStatisticsSchema=new Schema({
    hour:{
        type:String,
        required:true
    },
    viewsNumber:{
        type:Number,
        required:true
    },

},{
    _id:false
})

const StatisticsSchema=new Schema({
    young:{
        type:Number,
        required:true
    },
    middleAge:{
        type:Number,
        required:true
    },
    oldAge:{
        type:Number,
        required:true
    },
    nightVision:{
        type:Number,
        required:true
    },
    onFoot:{
        type:Number,
        required:true
    },
    bus:{
        type:Number,
        required:true
    },
    auto:{
        type:Number,
        required:true
    },
    bike:{
        type:Number,
        required:true
    },
    otherTransport:{
        type:Number,
        required:true
    },
    workingDayMonth:{
        type:Number,
        required:true
    },
   offDayMonth:{
        type:Number,
        required:true
    },
    workingDayStatistics:{
        type:[dayStatisticsSchema],
        required:true
    },
    dayOffStatistics:{
        type:[dayStatisticsSchema],
        required:true
    },
    monthViewsSeconds:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    locationId:{
        type:Schema.ObjectId,
        ref:'Location'
    },
    month:{
        type:String,
        required:true
    },
    pdf:{
        type: Schema.ObjectId,
        ref: 'Media',
    },

},{
    timestamps:true,
})




const Statistics=model('Statistics',StatisticsSchema)

function validate(Statistics){
    const StatisticsValid=Joi.object({
        young:Joi.number().required(),
        middleAge:Joi.number().required(),
        oldAge:Joi.number().required(),
        nightVision:Joi.number().required(),
        onFoot:Joi.number().required(),
        bus:Joi.number().required(),
        auto:Joi.number().required(),
        bike:Joi.number().required(),
        otherTransport:Joi.number().required(),
        workingDayMonth:Joi.number().required(),
        offDayMonth:Joi.number().required(),
        workingDayStatistics:Joi.array().items(Joi.object({
            hour:Joi.string().required(),
            viewsNumber:Joi.number().required(),
        })).required(),
        dayOffStatistics:Joi.array().items(Joi.object({
            hour:Joi.string().required(),
            viewsNumber:Joi.number().required(),
        })).required(),
        monthViewsSeconds:Joi.number().required(),
        price:Joi.number().required(),
        locationId:Joi.string().required(),
        month:Joi.string().required(),
        pdf:Joi.string().required()

    })

    return StatisticsValid.validate(Statistics)
}



export {Statistics,validate}
