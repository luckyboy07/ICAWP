'use strict';

var cb = require('./../../utils/callback');

var generateuserCtrl = require('../../controller/generateUserController').GenerateUser;
var generateuser = new generateuserCtrl();
var mysql = require('mysql');
var Database = require('../../utils/database').Database;
var db = new Database();


exports.generateUser = function onRequest(req, res) {
    if (req) {
        generateuser.generateUser(req.body, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.getUserById = function onRequest(req, res) {
    if (req) {
        generateuser.getUserById(req.params.id, req.body, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.updateUser = function onRequest(req, res) {
    if (req) {
        generateuser.updateUser(req.params.id, req.body, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.getUserById = function onRequest(req, res) {
    if (req) {
        generateuser.getUserById(req.params.id, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
