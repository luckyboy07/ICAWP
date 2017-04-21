'use strict';

var mailer = require("mailer");
var oauth = require('../../config/oauth.js');

var mandrill = require('mandrill-api/mandrill');

var userService = require('../services/userService').User;
var User = new userService();







exports.sendMail = function sendMail(req,res) {
    console.log('sendMail: ', req.body);

    var mandrill_client = new mandrill.Mandrill(oauth.mandrillapp.SMTP_Password);

    var message = {
        "html": "<p>Example HTML content</p>",
        "text": "Example text content",
        "subject": "example subject",
        "from_email": "pi.philipcesar@gmail.com",
        "from_name": "Example Name",
        "to": [{
            "email": "philipgaray2@gmail.com",
            "name": "Recipient Name",
            "type": "to"
        }],
        "headers": {
            "Reply-To": "philipgaray2@gmail.com"
        },
        "attachments": [{
            "type": "text/plain",
            "name": "myfile.txt",
            "content": "ZXhhbXBsZSBmaWxl"
        }],
        "images": [{
            "type": "image/png",
            "name": "IMAGECID",
            "content": "ZXhhbXBsZSBmaWxl"
        }]
    };

    var async = false;
    var ip_pool = "Main Pool";
    var send_at = new Date();
    mandrill_client.messages.send({
        "message": message,
        "async": async,
        "ip_pool": ip_pool
    }, function(result) {
        console.log('result: ', result);
        setupResponseCallback(result);
    }, function(e) {
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    });

    /*mailer.send({
        host: oauth.mandrillapp.Host,
        port: oauth.mandrillapp.Port,
        to: "philipgaray2@gmail.com",
        from: "pi.philipcesar@gmail.com",
        subject: "Mandrill knows Javascript!",
        body: "Hello from NodeJS!",
        authentication: "login",
        username: oauth.mandrillapp.SMTP_Username,
        password: oauth.mandrillapp.SMTP_Password
    }, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log('email: ', result);
    });*/

}


exports.recoverPassword = function recoverPassword(req, res) {

    User.findUserByValue(req.body, function(err, returnValue) {
        if (err instanceof Error) {
            throw err;
        } else {
            console.log('User recoverPassword: ', returnValue[0].email);

            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'pi.philipcesar@gmail.com',
                    pass: 'pi3cs.com'
                }
            });

            var mailOptions = {
                from: 'Mindanao Jobs <pi.philipcesar@gmail.com>',
                to: returnValue[0].email,
                subject: 'Reset your password for Mindanao Jobs',
                text: 'Hi Click the link below to reset your password'
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Message sent: ' + info.response);
                    res.redirect('/');
                }
            });
        }
    });
}

exports.registration = function registration(req, res) {

    var User = User.findUser(req.body._id, function(err, returnValue) {
        if (err instanceof Error) {
            throw err;
        } else {
            console.log('User Registration: ', returnValue);

            var mailOptions = {
                from: 'pi.philipcesar@gmail.com',
                to: req.body.to,
                subject: 'User Registration for Mindanao Jobs',
                text: 'Hi Click the link below to reset your password'
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Message sent: ' + info.response);
                }
            });
        }
    });

}


function setupResponseCallback(res) {
    return function(err, returnValue) {
        if (err instanceof Error) {
            throw err;
        } else {
            res.status(200).send(returnValue);
        }
    }
}
