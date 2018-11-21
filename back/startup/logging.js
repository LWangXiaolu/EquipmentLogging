const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, colorize } = format;
const express = require('express');
const app = express();

const myFormat=printf(info=>{
    return `${info.timestamp} ${info.level}: ${info.message}`;
})
const logger = createLogger({
  level: 'error',
  format: combine(format.json(), timestamp(),colorize(),myFormat), //myformat is to simplify the error message
  transports: [
    new transports.Console({handleExceptions: true}),
    new transports.File({ filename: './combined.log',handleExceptions: true })
  ],
 exitOnError: false,
});

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  },
};

app.use(require('morgan')('combined', { stream: logger.stream }));
module.exports.logger=logger;
module.exports.app=app;

