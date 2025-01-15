import express from "express";
import {User,validate} from '../model/user.model.js'
import _ from 'lodash'
import bcrypt from 'bcrypt'
import {auth} from '../middleware/auth.js'

const router=express.Router()

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API for managing advantages
 */

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: Get me user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Get
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/me', auth,async (req,res)=>{
    try{
        const user=await User.findById(req.user._id).select('-password')
        res.send(user)
    }catch (error){
        res.sendStatus(401).send('Bunday user yo\'q')
    }
})


/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get user List
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Get
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/',auth,async (req,res)=>{

    const user=await User.find().select('-password')
    res.send(user)
})


/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/',async (req,res)=>{

    const {error}=validate(req.body)

    if (error){
        return res.status(400).send(error.details[0].message)
    }

    let user=await User.findOne({email:req.body.email})

    if (user){
        return res.status(400).send('Bu email bilan ro\'yxatdan o\'tilgan' )
    }
    try{

        let user=req.body

        // user= new User(req.body)
        const salt=await bcrypt.genSalt()
        user.password=await bcrypt.hash(user.password, salt)

        let userSave=await User.create(user)

        res.send(_.pick(userSave,['_id','name','email','isAdmin']))
    } catch (error){
        res.send(error)
    }
})



export default router
