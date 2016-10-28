'use strict';

let log = require('../log')(module);

process.on('uncaughtException', (err) => {
    log.error('Uncaught exception: ', err);
});

process.on('unhandledRejection', (reason, p) => {
    log.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});