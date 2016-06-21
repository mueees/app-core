'use strict';

let config = new (require("nconf").Provider)(),
    path = require("path");

config.file('core.config', {file: path.join(__dirname, 'main.json')});

module.exports = config;