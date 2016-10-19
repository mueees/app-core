'use strict';

let assert = require('chai').assert;
let env = require('../environment');

function raiseError(e){
    if(!env.isProduction()){
        throw e;
    }
}

exports.isString = function (){
    try {
        assert.isString.apply(assert, arguments)
    }catch(e){
        raiseError(e);
    }
};

exports.isNumber = function (){
    try {
        assert.isNumber.apply(assert, arguments)
    } catch (e){
        raiseError(e);
    }
};

exports.isObject = function (){
    try {
        assert.isObject.apply(assert, arguments)
    } catch (e){
        raiseError(e);
    }
};

exports.isFunction = function (){
    try {
        assert.isFunction.apply(assert, arguments)
    } catch (e){
        raiseError(e);
    }
};

exports.isDefined = function(){
    try {
        assert.isDefined.apply(assert, arguments)
    } catch (e){
        raiseError(e);
    }
};

exports.isOk = function (){
    try {
        assert.isOk.apply(assert, arguments)
    }catch(e){
        raiseError(e);
    }
};