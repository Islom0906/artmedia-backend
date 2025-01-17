import 'express-async-errors';
import winston from 'winston';

export default () => {
    winston.add(new winston.transports.Console());
    winston.add(new winston.transports.File({ filename: 'logs/server.logs', level: 'error' }));
    winston.exceptions.handle(
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/server.logs' })
    );

    process.on('unhandledRejection', ex => {
        throw ex;
    });
};
