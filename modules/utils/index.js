'use strict';

let validator = require('validator');
let _ = require('lodash');

function isEmail(email) {
    return validator.isEmail(email);
}

function isStringWithLength(str) {
    return _.isString(str) && str.length > 0;
}

module.exports = {
    isEmail: isEmail,
    isStringWithLength: isStringWithLength
};