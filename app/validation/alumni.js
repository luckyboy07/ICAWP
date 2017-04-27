'use strict';

exports.validateAlumni = function(req, res, next) {
    req.checkBody('student_id', 'Please provide your Student id').notEmpty();
    req.checkBody('lastname', 'Please provide your lastname').notEmpty();
    req.checkBody('middlename', 'Please provide your middle').notEmpty();
    req.checkBody('firstname', 'Please provide your firstname').notEmpty();
    req.checkBody('email_address', 'Please provide your Email Address').notEmpty();
    req.checkBody('email_address', 'Email Address is not a valid email format').isEmail();
    req.checkBody('gender', 'Please provide your Gender').notEmpty();
    req.checkBody('contactnum', 'Please provide your Contact number').notEmpty();
    req.checkBody('course', 'Please provide your Course').notEmpty();
    req.checkBody('month_graduated', 'Please provide your Month graduated').notEmpty();
    req.checkBody('year_graduate', 'Please provide your Year graduated').notEmpty();
    req.checkBody('civil', 'Please provide your Civil').notEmpty();
    req.checkBody('course', 'Please provide your Course').notEmpty();
    req.checkBody('batch_name', 'Please provide your Batch').notEmpty();
    req.checkBody('nationality', 'Please provide your Nationality').notEmpty();
    req.checkBody('birth_date', 'Please provide your Date of Birth or Invalid Date of Birth').isDate();
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