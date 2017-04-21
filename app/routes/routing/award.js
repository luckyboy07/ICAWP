'use strict';

var cb = require('./../../utils/callback');

var awardCtrl = require('../../controller/awardController').Award;
var award = new awardCtrl();
var mysql = require('mysql');
var Database = require('../../utils/database').Database;
var db = new Database();

exports.createAward = function onRequest(req, res) {
    if (req) {
        award.createAward(req.body, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.getallAward = function onRequest(req, res) {
    if (req) {
        award.getallAward(cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.getAwardById = function onRequest(req, res) {
    if (req) {
        award.getAwardById(req.params.id, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.deleteAward = function onRequest(req, res) {
    if (req) {
        award.deleteAward(req.params.id, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.updateAward = function onRequest(req, res) {
    if (req) {
        award.updateAward(req.params.id, req.body, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};