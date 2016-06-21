'use strict';

let config = require('../../config');
let _ = require('lodash');
let assert = require('chai').assert;
let RequestAction = require('../request').action;
let hubConfig = _.cloneDeep(config.get('services:hub'));

class RequestToServiceAction extends RequestAction {
    execute(options) {
        assert.isString(options.url);
        assert.isString(options.method);

        var requestData = {
            url: 'http://' + hubConfig.host + ':' + hubConfig.port + '/service' + options.url,
            method: options.method
        };

        if (requestData.method === 'POST' || requestData.method === 'PUT') {
            requestData.data = options.data || {};
        }

        return super.execute(options);
    }
}

module.exports = RequestToServiceAction;