'use strict';

let assert = require('chai').assert;
let RequestToServiceAction = require('../../request-to-service');

class SendEmailAction extends RequestToServiceAction {
    execute(options) {
        assert.isString(options.message);

        options.url = '/email/send';
        options.method = 'POST';
        options.data = {
            message: options.message
        };

        return super.execute(options);
    }
}

module.exports = {
    name: 'service:email:send',
    action: SendEmailAction
};