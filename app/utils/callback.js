'use strict';

exports.setupResponseCallback = function(res) {

    return function(error, returnValue) {
        if (error) {
            return res.status(500).json({ response: error, statusCode: 500 });
        }

        res.status(200).json({ response: returnValue, statusCode: 200 });
    };
};

exports.setupSyncResponseCallback = function(res) {

    return function(error, returnValue) {
        if (error) {
            return res.status(500).json([{ response: error, statusCode: 500 }]);
        }

        res.status(200).json([{ response: returnValue, statusCode: 200 }]);
    };
};

exports.setupAnalyticsResponseCallback = function(res) {
    return function(error, returnValue) {
        if (error) {
            console.log('error: ', error);
            res.status(error.status).json({
                error: error,
                code: error.status,
                message: error.message
            });
        }
        res.status(200).json({ response: returnValue, statusCode: 200 });
    };
};

exports.setupAnalyticsTrackingResponseCallback = function(res) {
    return function(error, returnValue) {
        if (error) {
            console.log('error: ', error);
            res.status(error.status).json({
                error: error,
                code: error.status,
                message: error.message
            });
        }
        res.status(200).json(returnValue);
    };
};
