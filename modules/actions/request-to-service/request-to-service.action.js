'use strict';

let config = require('../../config');
let env = require('../../environment');
let RequestAction = require('../request');
let log = require('../../log')(module);

const DEFAULT_METHOD = 'GET';

/**
 * Internal action for making request to service through HUB service
 * */
class RequestToServiceAction extends RequestAction {
    execute(options) {
        let requestOptions = this.buildRequestOptions(options);

        let requestPromise = super.execute(requestOptions);

        return new Promise(function (resolve, reject) {
            requestPromise
                .then(function (responseData) {
                    let response = options.fullResponse === true ? responseData : responseData.body;

                    resolve(response);
                })
                .catch(function (responseData) {
                    log.error('404 internal request: ' + requestOptions.url);

                    if (responseData.response.statusCode === 404) {
                        responseData.body = responseData.response.body = {
                            message: 'Server error. Please ty again'
                        }
                    }

                    let response = options.fullResponse === true ? responseData : responseData.body;

                    reject(response);
                });
        });
    }

    buildRequestOptions(options) {
        let url;

        switch (true) {
            case env.isProduction():
                url = config.get('services:hub:url');
                break;

            case env.isDevelopment() || env.isTest():
                url = 'http://localhost:' + config.get('services:hub:port');
                break;
        }

        url += '/service/' + options.service + options.url;

        return {
            url: url,
            method: options.method || DEFAULT_METHOD,
            data: options.data,
            fullResponse: true
        }
    }
}

module.exports = RequestToServiceAction;