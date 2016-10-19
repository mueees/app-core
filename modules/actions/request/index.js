'use strict';

let BaseAction = require('../base');
let requestPromise = require('../../request-promise');

class RequestAction extends BaseAction {
    execute(options) {
        return requestPromise(options);
    }
}

module.exports = RequestAction;