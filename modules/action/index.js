'use strict';

let _ = require('lodash');
let config = require('../config');
let assert = require('../assert');
let log = require('../log')(module);

let actionDescriptors = [];

function registerAction(actionDescriptor) {
    assert.isObject(actionDescriptor);
    assert.isString(actionDescriptor.name);
    assert.isFunction(actionDescriptor.action);

    var action = new actionDescriptor.action();
    assert.isFunction(action.execute);

    actionDescriptors.push(actionDescriptor);
}

function getActionDescriptor(name) {
    return _.find(actionDescriptors, {
        name: name
    });
}

function getAction(name) {
    var actionDescriptor = getActionDescriptor(name);

    return actionDescriptor ? new actionDescriptor.action() : null;
}

function execute(name, data) {
    return new Promise(function (resolve, reject) {
        let action = getAction(name);

        if (action) {
            action.execute(data).then(resolve).catch(reject);
        } else {
            log.error('Cannot find action: ' + name);

            reject('Cannot find action');
        }
    });
}

exports.execute = execute;
exports.getAction = getAction;
exports.registerAction = registerAction;
exports.getActionDescriptor = getActionDescriptor;