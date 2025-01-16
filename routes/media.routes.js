import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Media } from '../model/media.model.js';
import deleteMedias from '../utils/deleteMedias.js';
import path from 'path';
import {auth} from '../middleware/auth.js'
import {admin} from "../middleware/role.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'media/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${uuidv4()}${ext}`);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        const error = 'Invalid file type. Only JPG, JPEG, PNG media, Video MP4 and PDF are allowed.';
        cb(new Error(error));
    }
};

const upload = multer({ storage, fileFilter });

/**
 * @swagger
 * tags:
 *   name: Media
 *   description: API for managing media files
 */

/**
 * @swagger
 * /api/media:
 *   get:
 *     summary: Retrieve all media files.
 *     tags: [Media]
 *     responses:
 *       200:
 *         description: List of media files.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Media'
 */
router.get('/',[auth,admin], async (req, res) => {
    try {
        const medias = await Media.find();
        res.send(medias);
    } catch (err) {
        console.error('Error fetching media:', err);
        res.status(500).send('Error fetching media.');
    }
});

/**
 * @swagger
 * /api/media:
 *   post:
 *     summary: Upload media files.
 *     tags: [Media]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               media:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Media files uploaded successfully.
 */
router.post('/', [auth,upload.array('media', 10)], async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('Please upload a file.');
    }

    try {
        const uploadedFiles = req.files.map((file) => ({
            name: file.filename,
            path: file.path,
        }));
        const savedMedia = await Media.create(uploadedFiles);
        res.send(savedMedia);
    } catch (err) {
        console.error('Error saving media to MongoDB:', err);
        res.status(500).send('Error saving media to MongoDB.');
    }
});

/**
 * @swagger
 * /api/media:
 *   delete:
 *     summary: Delete media files.
 *     tags: [Media]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Media deleted successfully.
 */
router.delete('/', auth,async (req, res) => {
    try {
        const medias = await Media.find({ _id: { $in: req.body.ids } });
        await Media.deleteMany({ _id: { $in: req.body.ids } });
        await deleteMedias(medias);
        res.send({ message: 'Media deleted successfully' });
    } catch (err) {
        console.error('Error deleting media:', err);
        res.status(500).send('Error deleting media.');
    }
});


export default router
