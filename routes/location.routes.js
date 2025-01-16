import express from "express";
import {Location, validate} from '../model/location.model.js';
import validId from '../middleware/validId.js';
import {auth} from '../middleware/auth.js';
import isValidIdBody from "../utils/isValidIdBody.js";
import {Statistics} from "../model/statistics.model.js";
import {calculatorStatistics} from "../utils/calculatorStatistics.js";


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Location
 *   description: API for managing location
 */

/**
 * @swagger
 * /api/location:
 *   get:
 *     summary: Get all location with pagination
 *     tags: [Location]
 *     responses:
 *       200:
 *         description: List of location with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Location'
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 *                 pageSize:
 *                   type: integer
 *                 nextPage:
 *                   type: boolean
 */
router.get('/', auth,async (req, res) => {
    try {
        const location = await Location.find()
            .populate('image', ' -name -__v')
            .populate('locationImage', ' -name -__v')
            .populate('video', ' -name -__v')


        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


/**
 * @swagger
 * /api/location/{id}:
 *   get:
 *     summary: Get a location item by ID
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Location ID
 *     responses:
 *       200:
 *         description: Location item found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Location not found
 */
router.get('/:id', async (req, res) => {
    try {
        const location = await Location.findById(req.params.id)
            .populate('image', ' -name -__v')
            .populate('locationImage', ' -name -__v')
            .populate('video', ' -name -__v')
        if (!location) {
            return res.status(404).json({message: 'Location not found'});
        }
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
/**
 * @swagger
 * /api/location/calculator/{id}:
 *   get:
 *     summary: Get a location item by ID
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Location ID
 *     responses:
 *       200:
 *         description: Location item found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Location not found
 */
router.get('/calculator:id', async (req, res) => {
    try {
        const location = await Location.findById(req.params.id)
            .populate('image', ' -name -__v')
            .populate('locationImage', ' -name -__v')
            .populate('video', ' -name -__v')
        const statistics=await Statistics.findOne({locationId:req.params.id})
        const calculateStatistics=calculatorStatistics(location,statistics)
        console.log(calculateStatistics)
        if (!location) {
            return res.status(404).json({message: 'Location not found'});
        }
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


/**
 * @swagger
 * /api/location:
 *   post:
 *     summary: Create a new location item
 *     tags: [Location]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       201:
 *         description: Location created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       400:
 *         description: Validation error
 */
router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const ValidId = isValidIdBody([req.body.image, req.body.locationImage, req.body.video])
    if (!ValidId) {
        return res.status(400).send('Mavjud bo\'lmagan id')
    }


    try {
        const location = await Location.create(req.body)
        res.status(201).send(location)

    } catch (error) {
        res.send(error.message)
    }

})

/**
 * @swagger
 * /api/location/{id}:
 *   put:
 *     summary: Update a location item by ID
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Location ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       200:
 *         description: Location updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Location not found
 */
router.put('/:id', [auth, validId], async (req, res) => {

    const {error} = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }


    const ValidId = isValidIdBody([req.body.image, req.body.locationImage, req.body.video])
    if (!ValidId) {
        return res.status(400).send('Mavjud bo\'lmagan id')
    }
    try {
        const location = await Location.findByIdAndUpdate(req.params.id, req.body, {new: true})

        if (!location) {
            return res.status(404).send('Berilgan ID bo\'yicha malumot topilmadi')
        }
        res.send(location)

    } catch (error) {
        res.send(error.message)
    }

})

/**
 * @swagger
 * /api/location/{id}:
 *   delete:
 *     summary: Delete a location item by ID
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Location ID
 *     responses:
 *       200:
 *         description: Location deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *       404:
 *         description: Location not found
 */
router.delete('/:id', [auth, validId], async (req, res) => {
    try {
        const location = await Location.findByIdAndDelete(req.params.id);
        if (!location) {
            return res.status(404).send('Berilgan ID bo\'yicha malumot topilmadi');
        }


        // const imagesId = location.image.map(id => new mongoose.Types.ObjectId(id));
        // const getDeleteImages = await Media.find({'_id': {$in: imagesId}});
        // await Media.deleteMany({_id: {$in: imagesId}});
        // await deleteMedias(getDeleteImages);
        //
        res.send(location);
    } catch (error) {
        res.send(error.message);
    }
});

export default router;
