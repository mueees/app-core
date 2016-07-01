var http = require('http'),
    express = require('express'),
    _ = require('lodash'),
    assert = require('chai').assert,
    bodyParser = require('body-parser'),
    HttpError = require('../error').HttpError,
    log = require('../log')(module);

module.exports = function (options) {
    assert.isString(options.name);
    assert.isNumber(options.port);

    var app = express();

    app.use(bodyParser.json({
        strict: false
    }));

    // init callback
    if (_.isFunction(options.init)) {
        options.init(app);
    }

    app.use(require("../middlewares/sendHttpError"));

    // error handling
    app.use(function (err, request, response, next) {
        if (typeof err == "number") {
            err = new HttpError(err);
        } else if (err instanceof HttpError) {

        } else {
            err = new HttpError(500, 'Fatal server error');
        }

        response.sendHttpError(err);
    });

    // before start callback
    if (_.isFunction(options.beforeStart)) {
        options.beforeStart(app);
    }

    http.createServer(app).listen(options.port);

    log.info('"' + options.name + '" service listens ' + options.port + ' port.');

    return app;
};