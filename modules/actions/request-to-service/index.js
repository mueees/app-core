'use strict';
let action = require('../../action');
let RequestToService = require('./request-to-service.action');

action.registerAction({
    name: 'requestToService',
    action: RequestToService
});

exports.RequestToService = RequestToService;