'use strict';

let BaseAction = require('../base');
let EmailSender = require('../../email').EmailSender;

class SendEmailAction extends BaseAction {
    execute(options) {
        return new Promise(function (resolve, reject) {
            let emailSender = new EmailSender({
                service: options.service,
                user: options.user,
                password: options.password
            });

            emailSender.send({
                to: options.to,
                from: options.from
            }).then(function () {
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