'use strict';

exports.validateJob = function(req, res, next) {
    req.checkBody('company_name', 'Please provide your Compay name').notEmpty();
    req.checkBody('position', 'Please provide your position').notEmpty();
    req.checkBody('address', 'Please provide your Address').notEmpty();
    req.checkBody('website', 'Please provide your company website').notEmpty();
    req.checkBody('job_type', 'Please provide your Proffession').notEmpty();
    req.checkBody('date_from', 'Please provide your date of your work').notEmpty();
    req.checkBody('job_related', 'Please provide your Job Course Related').notEmpty();
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