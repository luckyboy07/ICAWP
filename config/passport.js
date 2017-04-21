		/*jshint camelcase: false */

'use strict';

var env = process.env.NODE_ENV;
var config = require('../config/environment/' + env);

var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var _ = require('lodash-node');

var mysql = require('mysql');
var Database = require('../app/utils/database').Database;
var db = new Database();

module.exports = function (passport, jwt) {

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
};