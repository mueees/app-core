let action = require('../../action');
let SendEmailAction = require('./send-email.action');

action.registerAction({
    name: 'sendEmail',
    action: SendEmailAction
});

exports.SendEmailAction = SendEmailAction;