let action = require('../../action');
let SendEmailAction = require('./send-email.action');

action.registerAction({
    name: 'SendEmail',
    action: SendEmailAction
});

exports.SendEmailAction = SendEmailAction;