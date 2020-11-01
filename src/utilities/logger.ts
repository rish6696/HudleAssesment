import { createLogger,format,transports } from 'winston'
import fs from 'fs'
import path from 'path'
import { LOGGER_TIME_FORMAT } from '../constants';

const logDir = path.join(__dirname, '../logs');

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

export const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: LOGGER_TIME_FORMAT
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.colorize(),
                format.timestamp({
                    format: LOGGER_TIME_FORMAT 
                }),
                format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
            )
        })
    ],
    exitOnError: false
});


