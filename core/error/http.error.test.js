'use strict';

let HttpError = require('./index').HttpError;

describe.only('Http Error', function () {
    it('should exist base methods', function () {
        var err = new HttpError(400, 'test-message', {
            user: 1
        });

        console.log(err.message)
        console.log(err.data)
    });
});