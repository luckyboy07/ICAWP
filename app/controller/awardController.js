'use strict';

var env = process.env.NODE_ENV || 'development';
var config = require('../../config/environment/' + env);
var _ = require('lodash-node');

var awardDao = require('./../daos/awardDao');

function Award() {
    this.awardDao = awardDao;
}
Award.prototype.createAward = function(data, next) {
    awardDao.createAward(data, function(err, returnedData) {
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

Award.prototype.getallAward = function(next) {
    awardDao.getallAward(function(err, returnedData) {
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
Award.prototype.getAwardById = function(id, next) {
    awardDao.getAwardById(id, function(err, returnedData) {
        console.log('returnedData:',returnedData);
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
Award.prototype.deleteAward = function(id, next) {
    awardDao.deleteAward(id, function(err, response) {
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
Award.prototype.updateAward = function(id, data, next) {
    awardDao.updateAward(id, data, function(err, returnedData) {
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
exports.Award = Award;
