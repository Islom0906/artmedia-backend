import express from "express";
import {Statistics, validate} from '../model/statistics.model.js';
import validId from '../middleware/validId.js';
import {auth} from '../middleware/auth.js';
import isValidIdBody from "../utils/isValidIdBody.js";


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Location
 *   description: API for managing location
 */

/**
 * @swagger
 * /api/statistics:
 *   get:
 *     summary: Get all location with pagination
 *     tags: [Statistics]
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
 *                     $ref: '#/components/schemas/Statistics'
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
        const statistics = await Statistics.find()
            .populate('pdf','-name -__id')



        res.status(200).json(statistics);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


/**
 * @swagger
 * /api/statistics/{id}:
 *   get:
 *     summary: Get a statistics item by ID
 *     tags: [Statistics]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Statistics ID
 *     responses:
 *       200:
 *         description: Statistics item found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Statistics'
 *       404:
 *         description: Statistics not found
 */
router.get('/:id', async (req, res) => {
    try {
        const statistics = await Statistics.findById(req.params.id)
            .populate('pdf','-name -__id')


        if (!statistics) {
            return res.status(404).json({message: 'Statistics not found'});
        }
        res.status(200).json(statistics);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


/**
 * @swagger
 * /api/statistics:
 *   post:
 *     summary: Create a new statistics item
 *     tags: [Statistics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Statistics'
 *     responses:
 *       201:
 *         description: Statistics created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Statistics'
 *       400:
 *         description: Validation error
 */
router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }




    try {
        const statistics = await Statistics.create(req.body)
        res.status(201).send(statistics)

    } catch (error) {
        res.send(error.message)
    }

})

/**
 * @swagger
 * /api/statistics/{id}:
 *   put:
 *     summary: Update a statistics item by ID
 *     tags: [Statistics]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Statistics ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Statistics'
 *     responses:
 *       200:
 *         description: Statistics updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Statistics'
 *       404:
 *         description: Statistics not found
 */
router.put('/:id', [auth, validId], async (req, res) => {

    const {error} = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }



    try {
        const statistics = await Statistics.findByIdAndUpdate(req.params.id, req.body, {new: true})

        if (!statistics) {
            return res.status(404).send('Berilgan ID bo\'yicha malumot topilmadi')
        }
        res.send(statistics)

    } catch (error) {
        res.send(error.message)
    }

})

/**
 * @swagger
 * /api/statistics/{id}:
 *   delete:
 *     summary: Delete a statistics item by ID
 *     tags: [Statistics]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Statistics ID
 *     responses:
 *       200:
 *         description: Statistics deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message
 *       404:
 *         description: Statistics not found
 */
router.delete('/:id', [auth, validId], async (req, res) => {
    try {
        const statistics = await Statistics.findByIdAndDelete(req.params.id);
        if (!statistics) {
            return res.status(404).send('Berilgan ID bo\'yicha malumot topilmadi');
        }


        res.send(statistics);
    } catch (error) {
        res.send(error.message);
    }
});

export default router;
