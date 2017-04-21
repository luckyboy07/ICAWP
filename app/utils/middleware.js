'use strict';



var isLoggedIn = function(req, res, next) {
    // if user is authenticated in the session, carry on
    // console.info('req.isAuthenticated(): ', req.isAuthenticated());
    return next();
    // if (req.isAuthenticated()) {
    //     console.log('wa gi sulod');
    //     return next();
    // } else {
    //     // if they aren't redirect them to the home page
    //     console.log('asdas saa');
    //     res.redirect('/login');
    // }

};

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, Content-Type');
    next();
};

var passKeyToReq = function(apiKey) {
    return function passKeyRequest(req, res, next) {
        req.apiKey = apiKey;
        next();
    };
};

exports.isLoggedIn = isLoggedIn;
exports.allowCrossDomain = allowCrossDomain;
exports.passKeyHandler = passKeyToReq;
