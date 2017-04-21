'use strict';

process.env.TZ = 'UTC';

require('./config/env')();
var env = process.env.NODE_ENV || 'development';
process.env.NODE_ENV = env;


var application = require('./config/application'),
    express = require('express'),
    bunyan = require('bunyan'),
    mysql = require('mysql'),
    ejwt = require('express-jwt'),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
    CronJob = require('cron').CronJob,
    middleware = require('./app/utils/middleware'),
    config = require('./config/environment/' + env),
    Database = require('./app/utils/database').Database,
    db = new Database(mysql, config),
    log = bunyan.createLogger({
        name: config.app_name
    }),
    app = express();

var router = express.Router({
    strict: true,
    caseSensitive: true
});


require(application.utils + 'helper')(db, app, config, log);
require(application.config + 'express')(app, config, passport, ejwt);
require(application.config + 'authentication')(app, config, ejwt);
require(application.config + 'passport')(passport, jwt);

// Routes
require(application.routes + '/login')(app, config, passport);
require(application.routes + '/')(app, passport, config, middleware);

module.exports = app;
