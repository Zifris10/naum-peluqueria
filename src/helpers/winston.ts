import { createLogger, transports, format } from 'winston';
const { combine, timestamp, prettyPrint } = format;

export const logger = createLogger({
    format: combine(timestamp(), prettyPrint()),
    transports: [
        new transports.File({
            filename: 'logs/error.log',
            level: 'error'
        })
    ]
});