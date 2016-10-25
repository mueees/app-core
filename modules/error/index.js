'use strict';

let HttpError = require('./http-error');
let assert = require('../assert');

exports.HttpError = HttpError;

exports.getHttpError = function (code, message, data) {
    return new HttpError(code, message, data);
};