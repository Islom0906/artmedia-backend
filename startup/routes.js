import express from 'express';
import cors from 'cors';
import path from 'path';
import error from '../middleware/error.js';
import mediaRouter from '../routes/media.routes.js';
import userRouter from '../routes/user.routes.js'
import authRouter from '../routes/auth.routes.js'
import locationRouter from '../routes/location.routes.js'

export default (app) => {
    const imagesFolderPath = path.join(path.resolve());

    app.use(cors());
    app.use('/api/', express.static(imagesFolderPath));
    app.use(express.json());
    app.use('/api/media', mediaRouter);
    app.use('/api/user', userRouter)
    app.use('/api/auth', authRouter)
    app.use('/api/location', locationRouter)
    app.use(error);
};
