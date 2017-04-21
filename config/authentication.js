/*jshint camelcase: false */

'use strict';

module.exports = function(app, config, ejwt) {
    if (app.get('env') === 'development' || app.get('env') === 'staging') {
        app.use(function(err, req, res, next) {
            /*jshint unused: vars*/
            console.info('DEVELOPMENT / STAGING error: ', err);
            if (err.name === 'UnauthorizedError') {
                res.status(401).json({
                    response: {
                        result: 'UnauthorizedError',
                        success: false,
                        msg: err.inner
                    },
                    statusCode: 401
                });
            } else if (err.code == 'LIMIT_FILE_SIZE') {
                res.status(400).json({
                    response: {
                        result: 'LIMIT_FILE_SIZE',
                        success: false,
                        msg: err.inner
                    },
                    statusCode: 400
                });
            } else {
                res.status(400).json({
                    response: {
                        result: err,
                        success: false,
                        msg: err.message
                    },
                    statusCode: 400
                });
            }
        });
    }



    app.use(function(err, req, res, next) {
        /*jshint unused: vars*/
        console.info('PRODUCTION error: ');
        if (err.name === 'UnauthorizedError') {
            res.status(401).json({
                response: {
                    result: 'UnauthorizedError',
                    success: false,
                    msg: err.inner
                },
                statusCode: 401
            });
        } else if (err.code == 'LIMIT_FILE_SIZE') {
            res.status(400).json({
                response: {
                    result: 'LIMIT_FILE_SIZE',
                    success: false,
                    msg: err.inner
                },
                statusCode: 400
            });
        } else {
            res.status(400).json({
                response: {
                    result: err,
                    success: false,
                    msg: err.message
                },
                statusCode: 400
            });
        }
    });
};
