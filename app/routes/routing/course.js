'use strict';

var cb = require('./../../utils/callback');

var courseCtrl = require('../../controller/courseController').Course;
var course = new courseCtrl();
var mysql = require('mysql');
var Database = require('../../utils/database').Database;
var db = new Database();

exports.createCourse = function onRequest(req, res) {
    if (req) {
        course.createCourse(req.body, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.getAllcourse = function onRequest(req, res) {
    if (req) {
        course.getAllcourse(cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.getCourseById = function onRequest(req, res) {
    if (req) {
        course.getCourseById(req.params.id, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.deleteCourse = function onRequest(req, res) {
    if (req) {
        course.deleteCourse(req.params.id, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.updateCourse = function onRequest(req, res) {
    if (req) {
        course.updateCourse(req.params.id, req.body, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};