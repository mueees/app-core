var http = require('http'),
    express = require('express'),
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

    // initialize routes
    options.routes(app);

    app.use(require("../middlewares/sendHttpError"));

    app.use(function (err, request, response, next) {
        if (typeof err == "number") {
            err = new HttpError(err);
        } else if (err instanceof HttpError) {

        } else {
            err = new HttpError(500, 'Fatal server error');
        }

        response.sendHttpError(err);
    });

    http.createServer(app).listen(options.port);

    log.info(options.name + ' listening ' + options.port + ' port.');

    return app;
};