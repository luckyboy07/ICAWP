'use strict';

var env = process.env.NODE_ENV || 'development';
var config = require('../../config/environment/' + env);
var _ = require('lodash-node');

var generateDao = require('./../daos/generateDao');

function GenerateUser() {
    this.generateDao = generateDao;
}

GenerateUser.prototype.generateUser = function(data, next) {
    generateDao.generateUser(data, function(err, returnedData) {
        console.log('returnedData:',returnedData);
        if (!err) {
            next(null, {
                success: true,
                msg: 'Record Successfully Created',
                result: returnedData[0]
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
GenerateUser.prototype.getUserById = function(id, next) {
    generateDao.getUserById(id, function(err, returnedData) {
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
GenerateUser.prototype.updateUser = function(id, data, next) {
    console.log('id:',id);
    generateDao.updateUser(id, data, function(err, returnedData) {
        if (!err) {
            next(null, {
                success: true,
                msg: 'Record Successfully Update',
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
exports.GenerateUser = GenerateUser;
