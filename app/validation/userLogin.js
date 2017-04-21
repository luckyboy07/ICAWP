'use strict';

exports.validateLogin = function(req, res, next){

	req.assert('username', 'Please provide your Username').notEmpty();
	req.assert('password', 'Please provide your Password').notEmpty();

	var errors = req.validationErrors();

    if (errors) {
        res.status(200).send(errors);
    } else {
        next();
    }
}
