'use strict';

exports.login = function(req, res) {
    req.logIn(req.user, function(err) {
        if (err) {
            return next(err);
        }
        res.status(200).json(req.user);
    });
};
