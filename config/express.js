/*jshint camelcase: false */

'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var middleware = require('../app/utils/middleware');
var expressValidator = require('express-validator');
var flash = require('connect-flash');

module.exports = function (app, config, passport, ejwt, mongoose) {

    app.use('/public', express.static(__dirname + './../public'));
    app.use('/uploads', express.static(__dirname + './../public/uploads'));
    app.set('port', config.port || process.env.APP_PORT);
    app.set('ip', config.ip);
    app.set('env', config.env);
    app.set('config', config);
    app.set('api_version', process.env.APP_VER || '/api/1.0');
    app.set('view engine', 'ejs');
    app.set('views', 'app/view/');
    app.use(morgan('dev'));
    app.use(methodOverride());
    app.use(expressValidator({
        customValidators: {
            isArray: function (value) {
                return Array.isArray(value);
            },
            isInRatingRange: function (value) {
                if (value >= 1 && value <= 5) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }));
    app.use(cookieParser());
    app.use(bodyParser.json({
        type: 'application/json',
        limit: '50mb'
    }));
    app.use(bodyParser.urlencoded({
        extended: true,
        limit: '50mb'
    }));

    app.use(flash());
    app.use(middleware.allowCrossDomain);
    // app.use(session({
    //     secret: config.token_secret,
    //     cookie: {
    //         secure: true,
    //         maxAge: 60000
    //     },
    //     resave: true,
    //     saveUninitialized: true
    // }));
    app.use(passport.initialize());
    app.use(passport.session());

    /*process.on('uncaughtException', function(err) {
        console.log('Caught exception: ', err);
    });*/
};