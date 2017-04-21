'use strict';

exports.validateUser = function(req, res, next) {
    // console.log('lamalam:');
    req.checkBody('username', 'Please provide your username').notEmpty();
    req.checkBody('password', 'Please provide your password').notEmpty();
    // req.checkBody('firstname', 'Please provide your firstname').notEmpty();
    // req.checkBody('email_address', 'Please provide your Email Address').notEmpty();
    // req.checkBody('email_address', 'Email Address is not a valid email format').isEmail();
    // req.checkBody('gender', 'Please provide your Gender').notEmpty();
    // req.checkBody('contactnum', 'Please provide your Contact number').notEmpty();
    // req.checkBody('course', 'Please provide your Course').notEmpty();
    // req.checkBody('year_graduate', 'Please provide your Year Graduated').notEmpty();
    // req.checkBody('civil', 'Please provide your Civil').notEmpty();
    // req.checkBody('store_id', 'Please provide what Store the Person belongs').notEmpty();
    // req.checkBody('per_type_id', 'Please provide your store_id').notEmpty();

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
