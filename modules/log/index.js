'use strict';

let env = require('../environment');
let assert = require('chai').assert;

class Logger {
    constructor(module) {
        assert.isOk(module);

        this.module = module;
        this.pathModule = module.filename.split("/").slice(-2).join('/');
    }

    error(message) {
        console.error(message);
    }

    info(message) {
        console.log(message);
    }

    // only should be visible on development mode
    debug(message) {
        if (env.isDevelopment()) {
            console.debug(message);
        }
    }

    warning(message) {
        console.warn(message);
    }
}

// pass module instance to Logger for further manipulation
module.exports = function (module) {
    return new Logger(module);
};