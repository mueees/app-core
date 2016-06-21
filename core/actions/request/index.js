'use strict';

let assert = require('chai').assert;
let BaseAction = require('../base');
let requestPromise = require('../../request-promise');

class RequestAction extends BaseAction {
    execute(options) {
        assert.isString(options.url);
        assert.isString(options.method);

        if (options.method === 'POST' || options.method === 'PUT') {
            options.data = options.data || {};
        }

        return requestPromise(options);
    }
}

module.exports = {
    name: 'request',
    action: RequestAction
};