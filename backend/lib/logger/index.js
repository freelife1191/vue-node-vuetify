const { createLogger, format, transports } = require('winston');
const { combine, label, printf } = format;

const config = require(__basedir + '/lib/config/logger');

const moment = require('moment-timezone'),
    path = require('path');

const logFormat = printf(info => `${info.timestamp} [${info.level}]: ${info.label} - ${info.message}`);
const appendTimestamp = format((info, opts) => {
    if(opts.tz)
        info.timestamp = moment().tz(opts.tz).format('YYYY-MM-DD hh:mm:ss.SSS z').trim();
    return info;
});

const logDir = path.join(__dirname, '..', '..', 'logs');

const logger = createLogger({
    level: config.level,
    format: combine(
        label({ label: 'main' }),
        appendTimestamp({ tz: 'Asia/Seoul' }),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new (require('winston-daily-rotate-file'))({
            filename: `${logDir}/` + config.filename,
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: config.maxSize,
            maxFiles: config.maxFiles
        })
    ]
});

module.exports = logger