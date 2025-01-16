import express from 'express';
import dotenv from 'dotenv';
import winston from 'winston';
import loggin from './startup/loggin.js';
import setupSwagger from './startup/swagger.js';
import startupDb from './startup/db.js';
import startupRoutes from './startup/routes.js';
const app = express();




dotenv.config();
loggin()
setupSwagger(app);
startupRoutes(app);
startupDb();


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    winston.info(`Project is running on port: ${PORT}`);
});
