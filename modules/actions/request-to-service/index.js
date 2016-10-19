'use strict';

let config = require('../../config');
let env = require('../../environment');
let assert = require('../../assert');
let RequestAction = require('../request');

const DEFAULT_METHOD = 'GET';

/**
 * Alias for making request only to HUB service
 * Define base url based on environment
 * Build url for making request
 * */

class RequestToServiceAction extends RequestAction {
    execute (options) {
        assert.isString(options.service);
        assert.isString(options.url);

        return super.execute(this.buildRequestOptions(options));
    }

    buildRequestOptions(options) {
        let url;

        switch (true){
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
            fullResponse: options.fullResponse === true
        }
    }
}

module.exports = RequestToServiceAction;