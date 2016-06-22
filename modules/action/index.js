'use strict';

let _ = require('lodash');
let config = require('../config');
let assert = require('chai').assert;

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

    assert.isDefined(actionDescriptor);

    return new actionDescriptor.action();
}

function execute(name, data) {
    return getAction(name).execute(data);
}

exports.execute = execute;
exports.getAction = getAction;
exports.registerAction = registerAction;
exports.getActionDescriptor = getActionDescriptor;