import express from "express";
import {User} from '../model/user.model.js'
import bcrypt from 'bcrypt'
import Joi from 'joi'
const router=express.Router()



/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Auth'
 *     responses:
 *       201:
 *         description: User Loged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auth'
 *       200:
 *         description: User Loged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Auth'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/', async (req,res)=>{
    const {error}=validate(req.body)

    if (error){
        return res.status(400).send(error.details[0].message)
    }

    let user=await User.findOne({login:req.body.login})

    if (!user){
        return res.status(400).send('Email yoki parol xato ')
    }

    const isValidPassword=await bcrypt.compare(req.body.password,user.password)
    if (!isValidPassword){
        return res.status(400).send('Email yoki parol xato ')
    }

    const token=user.generateAuthToken(user)

    res.send({'access': token})
})

function validate(req){
    const userValid=Joi.object({
        login:Joi.string().required(),
        password:Joi.string().required()
    })

    return userValid.validate(req)
}
export default router
