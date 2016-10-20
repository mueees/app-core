'use strict';

let nodemailer = require('nodemailer');

let assert = require('../assert');
let log = require('../log')(module);

/**let emailSender = new exports.EmailSender({
    service: 'gmail',
    user: 'example',
    password: 'password'
});

 emailSender.send({
    from: 'example@gmail.com',
 to: 'example@gmail.com',
 html: '<message>',
 subject: '<subject>'
 }).then(function () {

}).catch(function () {

});*/

class EmailSender {
    constructor(options) {
        assert.isObject(options);
        assert.isString(options.service);
        assert.isString(options.user);
        assert.isString(options.password);

        this.options = options;

        this.smtpTransport = nodemailer.createTransport({
            service: options.service,

            auth: {
                user: options.user,
                pass: options.password
            }
        });
    }

    send(options) {
        assert.isObject(options);
        assert.isString(options.from);
        assert.isString(options.to);

        let me = this;
        let emailOptions = this.getEmailOptions(options);

        return new Promise(function (resolve, reject) {
            me.smtpTransport.sendMail(emailOptions, function (error) {
                if (error) {
                    log.error(error);

                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    getEmailOptions(options) {
        let emailOptions = {
            from: options.from,
            to: options.to,
            subject: options.subject || ''
        };

        switch (true) {
            case Boolean(options.text):
                emailOptions.text = options.text;

                break;

            case Boolean(options.body):
                emailOptions.body = options.body;

                break;

            case Boolean(options.html):
                emailOptions.html = options.html;

                break;
            default:
                emailOptions.text = "nothing";

                break;
        }

        return emailOptions;
    }

    close() {
        if (this.smtpTransport) {
            this.smtpTransport.close();
        }
    }
}

module.exports = EmailSender;