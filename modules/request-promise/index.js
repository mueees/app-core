'use strict';

/**
 * request module cannot return promise, that is why we should handle it by yourself
 * Resolve promise only when statusCode = 200
 *
 * Options {Object}
 * url - String
 * method - String
 * data - Object - Only when method is POST or PUT
 *
 * */
let assert = require('../assert');
const request = require('request');
const log = require('../log')(module);

/**
 SUCCESS:
 1xx Informational.
 2xx Success.
 3xx Redirection.

 ERROR:
 4xx Client Error.
 5xx Server Error.
 * */

function isSuccessResponse(response) {
    return response.statusCode < 400;
}

module.exports = function (options) {
    return new Promise(function (resolve, reject) {
        assert.isString(options.url);
        assert.isString(options.method);

        // TODO use ES6 destruction
        var requestData = {
            url: options.url,
            method: options.method
        };

        // serialize data if method is POST or PUT
        if ((options.method === 'POST' || options.method === 'PUT') && options.data) {
            requestData.json = true;
            requestData.body = options.data;
        }

        request(requestData, function (error, response, body) {
            if (error) {
                log.error(error.message);

                reject({
                    status: 500,
                    message: 'Cannot execute request'
                });

                return;
            }

            try {
                body = JSON.parse(body);
            } catch (e) {
                // do nothing
            }

            let res = body;

            if (options.fullResponse === true) {
                res = {
                    body: body,
                    response: response
                };
            }

            isSuccessResponse(response) ? resolve(res) : reject(res);
        });
    });
};