'use strict';

let HttpError = require('./http-error');
let assert = require('chai').assert;

exports.HttpError = HttpError;

exports.getHttpError = function (code, message) {
    assert.isNumber(code);
    assert.isString(message);

    return new HttpError(code, message);
};