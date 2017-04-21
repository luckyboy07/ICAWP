'use strict';

var cb = require('./../../utils/callback');

var user_accountsCtrl = require('../../controller/userAccountsController').Users;
var user_accounts = new user_accountsCtrl();
var mysql = require('mysql');
var Database = require('../../utils/database').Database;
var db = new Database();


exports.createUser = function onRequest(req, res) {
	// console.log('req:',req);
    if (req) {
        user_accounts.createUser(req.body, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.getAllUser = function onRequest(req, res) {
    if (req) {
        user_accounts.getAllUser(cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.getUserById = function onRequest(req, res) {
    if (req) {
        user_accounts.getUserById(req.params.id, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.deleteUser = function onRequest(req, res) {
    if (req) {
        user_accounts.deleteUser(req.params.id, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.updateUser = function onRequest(req, res) {
    if (req) {
        user_accounts.updateUser(req.params.id, req.body, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.resetPassword = function onRequest(req, res) {
    console.log('wala:',req.params.id);
    if (req) {
        user_accounts.resetPassword(req.params.id, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};