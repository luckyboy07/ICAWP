'use strict';

var env = process.env.NODE_ENV || 'development';
var config = require('../../config/environment/' + env);
var _ = require('lodash-node');

var jobDao = require('./../daos/jobDao');

function Jobs() {
    this.jobDao = jobDao;
}

Jobs.prototype.getAlljob = function(next) {
    jobDao.getAlljob(function(err, returnedData) {
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
Jobs.prototype.getjobhistoryByid = function(id, next) {
    jobDao.getjobhistoryByid(id, function(err, returnedData) {
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
            result: returnedData
        });
    });
};

Jobs.prototype.updatejobhistory = function(id, data, next) {
    jobDao.updatejobhistory(id, data, function(err, returnedData) {
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

Jobs.prototype.createJobHistory = function(id, data, next) {
    jobDao.createJobHistory(id, data, function(err, returnedData) {
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

exports.Jobs = Jobs;
