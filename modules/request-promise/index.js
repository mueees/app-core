'use strict';

const request = require('request');

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
module.exports = function (options) {
    return new Promise(function (resolve, reject) {
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
                reject({
                    status: 500,
                    message: 'Cannot execute request'
                });
            } else if (response.statusCode != 200) {
                reject({
                    status: response.statusCode,
                    message: body.message
                });
            } else {
                if ((options.method === 'POST' || options.method === 'PUT') && options.data) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {
                        // do nothing
                    }
                }

                resolve({
                    body: body,
                    response: response
                });
            }
        });
    });
};