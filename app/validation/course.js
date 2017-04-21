'use strict';

exports.validateCourse = function(req, res, next) {
    req.checkBody('name', 'Please provide Course name').notEmpty();
    req.checkBody('description', 'Please provide description').notEmpty();
    req.checkBody('curr_years', 'Please provide Curriculum years').notEmpty();
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