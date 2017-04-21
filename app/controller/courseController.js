'use strict';

var env = process.env.NODE_ENV || 'development';
var config = require('../../config/environment/' + env);
var _ = require('lodash-node');

var courseDao = require('./../daos/courseDao');

function Course() {
    this.courseDao = courseDao;
}
Course.prototype.createCourse = function(data, next) {
    courseDao.createCourse(data, function(err, returnedData) {
        if (!err) {
            next(null, {
                success: true,
                msg: 'Record Successfully Created',
                result: returnedData
            });
        } else {
            next({
                result: err,
                msg: err.message,
                success: false
            }, null);
        }

    });
};

Course.prototype.getAllcourse = function(next) {
    courseDao.getAllcourse(function(err, returnedData) {
        if (err) {
            next({
                result: err,
                msg: err.message,
                success: false
            }, null);
        } else {
            next(null, {
                result: returnedData,
                msg: 'SUCCESS',
                success: true
            });
        }
    });
};
Course.prototype.getCourseById = function(id, next) {
    courseDao.getCourseById(id, function(err, returnedData) {
        if (err) {
            next({
                result: err,
                msg: err.message,
                success: false
            }, null);
        }
        next(null, {
            success: true,
            msg: '',
            result: returnedData[0]
        });
    });
};
Course.prototype.deleteCourse = function(id, next) {
    courseDao.deleteCourse(id, function(err, response) {
        if (err) {
            next({
                result: err,
                msg: err.message,
                success: false
            }, null);
        }
        next(null, {
            result: response,
            msg: 'Record Successfully Deleted',
            success: true
        });
    });
};
Course.prototype.updateCourse = function(id, data, next) {
    courseDao.updateCourse(id, data, function(err, returnedData) {
        if (err) {
            next({
                result: err,
                msg: err.message,
                success: false
            }, null);
        }

        next(null, {
            success: true,
            msg: 'Data successfully updated!!!',
            result: returnedData
        });
    });
};
exports.Course = Course;
