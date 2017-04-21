'use strict';
exports.validateEmail = function(req, res, next) {
    req.checkBody('from', 'Please provide Email From').notEmpty();
    req.checkBody('from', 'Email Address is not a valid email format').isEmail();
    req.checkBody('subject', 'Please provide Email Subject').notEmpty();
    req.checkBody('email', 'Please provide Email Address').notEmpty();
    req.checkBody('email', 'Email Address is not a valid email format').isEmail();
    req.checkBody('message', 'Please provide Email Content').notEmpty();

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
