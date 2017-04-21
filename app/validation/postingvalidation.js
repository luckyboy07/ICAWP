'use strict';

exports.validatePost = function(req, res, next) {
    req.checkBody('post', 'Please provide your post').notEmpty();
    req.checkBody('category', 'Please Select your category post').notEmpty();
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