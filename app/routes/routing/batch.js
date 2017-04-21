'use strict';

var cb = require('./../../utils/callback');

var batchCtrl = require('../../controller/batchController').Batch;
var batch = new batchCtrl();
var mysql = require('mysql');
var Database = require('../../utils/database').Database;
var db = new Database();

exports.createBatch = function onRequest(req, res) {
    if (req) {
        batch.createBatch(req.body, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.getAllBatch = function onRequest(req, res) {
    if (req) {
        batch.getAllBatch(cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.getBatchbyId = function onRequest(req, res) {
    if (req) {
        batch.getBatchbyId(req.params.id, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.deleteBatch = function onRequest(req, res) {
    if (req) {
        batch.deleteBatch(req.params.id, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.updateBatch = function onRequest(req, res) {
    if (req) {
        batch.updateBatch(req.params.id, req.body, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};