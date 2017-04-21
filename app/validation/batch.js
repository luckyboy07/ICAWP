'use strict';

exports.validateBatch = function(req, res, next) {
    req.checkBody('name', 'Please provide Batch name').notEmpty();
    req.checkBody('year_graduated', 'Please provide Year graduated').notEmpty();
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