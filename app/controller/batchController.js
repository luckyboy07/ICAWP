'use strict';

var env = process.env.NODE_ENV || 'development';
var config = require('../../config/environment/' + env);
var _ = require('lodash-node');

var batchDao = require('./../daos/batchDao');

function Batch() {
    this.batchDao = batchDao;
}
Batch.prototype.createBatch = function(data, next) {
    batchDao.createBatch(data, function(err, returnedData) {
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

Batch.prototype.getAllBatch = function(next) {
    batchDao.getAllBatch(function(err, returnedData) {
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
Batch.prototype.getBatchbyId = function(id, next) {
    batchDao.getBatchbyId(id, function(err, returnedData) {
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
Batch.prototype.deleteBatch = function(id, next) {
    batchDao.deleteBatch(id, function(err, response) {
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
Batch.prototype.updateBatch = function(id, data, next) {
    batchDao.updateBatch(id, data, function(err, returnedData) {
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
exports.Batch = Batch;
