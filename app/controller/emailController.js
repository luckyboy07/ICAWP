'use strict';

var env = process.env.NODE_ENV || 'development';
var config = require('../../config/environment/' + env);
var _ = require('lodash-node');

function Email() {}

Email.prototype.sendEmail = function(data, next) {
    console.log('data:', data);
    var helper = require('sendgrid').mail;

    var from_email = new helper.Email(data.from);
    var to_email = new helper.Email(data.email);
    var subject = data.subject;
    var content = new helper.Content('text/html', data.message);

    // var from_email = new helper.Email('cocluck7@gmail.com');
    // var to_email = new helper.Email('tessa@yopmail.com');
    // var subject = 'Hello World from the SendGrid Node.js Library!';
    // var content = new helper.Content('text/html', '<h1>HI</h1>');

    var mail = new helper.Mail(from_email, subject, to_email, content);

    console.log('mail:', mail);
    var sg = require('sendgrid')(config.sendgrid_key);

    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
    });

    sg.API(request, function(error, response) {
        console.log('error:', error);
        if (error) {
            console.log('error', 'error sending email ' + error.message);
            var err = 'error sending email';
            next({
                result: err,
                msg: error.message,
                success: false
            }, null)
        } else {
            if (response.statusCode == 200 || response.statusCode == 202) {
                console.log('respomnse', response);
                console.log('info', 'success sending email ' + response);
                next(null, {
                    result: response,
                    msg: 'success sending email',
                    success: true
                })
            } else {
                console.log(response);
                console.log('info', 'warning occurs on sending email ' + response);
                next(null, {
                    result: response,
                    msg: 'warning occurs on sending email',
                    success: true
                })
            }
        }
    });
};

// function senddhan(data) {
//     var message = data.message;
//     var helper = require('sendgrid').mail;
//     var from_email = new helper.Email('support@tessa.com.ph');
//     var to_email = new helper.Email(data.emailaddress);
//     var subject = 'RFQ-Notifs';

//     var mail = new helper.Mail(from_email, subject, to_email, content);

//     var sg = require('sendgrid')(config.sendgrid_key);
//     var request = sg.emptyRequest({
//         method: 'POST',
//         path: '/v3/mail/send',
//         body: mail.toJSON(),
//     });

//     sg.API(request, function(error, response) {
//         if (error) {
//             console.log('error', 'error sending email ' + error.message);
//         } else {
//             if (response.statusCode == 200 || response.statusCode == 202) {
//                 console.log(response);
//                 console.log('info', 'success sending email ' + response);
//             } else {
//                 console.log(response);
//                 console.log('info', 'warning occurs on sending email ' + response);
//             }
//         }
//     });
// }
exports.Email = Email;
