'use strict';

var cb = require('./../../utils/callback');

var jobhistoryCtrl = require('../../controller/jobhistoryController').Jobs;
var jobhistory = new jobhistoryCtrl();
var mysql = require('mysql');
var Database = require('../../utils/database').Database;
var db = new Database();

exports.getAlljob = function onRequest(req, res) {
    if (req) {
        jobhistory.getAlljob(cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};

exports.getjobhistoryByid = function onRequest(req, res) {
    if (req) {
        jobhistory.getjobhistoryByid(req.params.id, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.updatejobhistory = function onRequest(req, res) {
    if (req) {
        jobhistory.updatejobhistory(req.params.id, req.body, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.createJobHistory = function onRequest(req, res) {
    if (req) {
        jobhistory.createJobHistory(req.params.id, req.body, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
