'use strict';

exports.validateAward = function(req, res, next) {
    req.checkBody('award_type', 'Please provide your Type of award').notEmpty();
    req.checkBody('description', 'Please provide your Award description').notEmpty();
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