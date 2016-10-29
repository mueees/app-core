'use strict';

let BaseAction = require('../base');
let EmailSender = require('../../email').EmailSender;

let _ = require('lodash');

class SendEmailAction extends BaseAction {
    execute(options) {
        return new Promise(function (resolve, reject) {
            let emailSender = new EmailSender({
                service: options.service,
                user: options.user,
                password: options.password
            });

            let emailOptions = _.pick(options, [
                'to',
                'from',
                'body',
                'html',
                'text',
                'subject'
            ]);

            emailSender.send(emailOptions).then(function () {
                resolve();

                emailSender.close();
            }).catch(function () {
                reject();

                emailSender.close();
            });
        })
    }
}

module.exports = SendEmailAction;