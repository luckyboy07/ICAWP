'use strict';

exports.validateLogin = function (req, res, next) {
    req.checkBody('username', 'Please provide your Username').notEmpty();
    req.checkBody('password', 'Please provide your Password').notEmpty();

    var errors = req.validationErrors();
    console.log('errors:',errors);
    if (errors) {
        res.status(400).send({
            response: {
                result: errors,
                msg: '',
                success: false
            },
            statusCode: 400
        });
    } else {
        next();
    }
};


exports.validateForgot = function (req, res, next) {
    req.checkBody('email', 'Please provide your Email Address').notEmpty();
    req.checkBody('email', 'Email Address is not a valid email format').isEmail();

    var errors = req.validationErrors();

    if (errors) {
        res.status(400).send({
            response: {
                result: errors,
                msg: '',
                success: false
            },
            statusCode: 400
        });
    } else {
        next();
    }
};
