import mongoose from 'mongoose';
import winston from 'winston';

export default () => {
    mongoose.connect(process.env.DB_URL)

    .then(() => {
        console.log('Connected to MongoDB');
        winston.debug('Connected to MongoDB');
    })
    .catch(err => {
        console.error('MongoDB connection error', err);
        winston.error('MongoDB connection error', err);
    });
};
