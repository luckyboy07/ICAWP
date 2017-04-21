'use strict';

var env = process.env.NODE_ENV || 'development';
var config = require('../../config/environment/' + env);
var _ = require('lodash-node');

var alumniDao = require('./../daos/alumniDao');

function Alumni() {
    this.alumniDao = alumniDao;
}

Alumni.prototype.createAlumni = function(data, next) {
    alumniDao.createAlumni(data, function(err, returnedData) {
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

Alumni.prototype.getAlumni = function(next) {
    alumniDao.getAlumni(function(err, returnedData) {
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
Alumni.prototype.getAlumniById = function(id, next) {
    alumniDao.getAlumniById(id, function(err, returnedData) {
        console.log('returnedData:', returnedData);
        if (err) {
            next({
                result: err,
                msg: err.message,
                success: false
            }, null);
        }
        _.each(returnedData, function(row) {
            if (row.image_path) {
                row.image_path = config.api_host_url + '/' + row.image_path;
            }
        });
        next(null, {
            success: true,
            msg: '',
            result: returnedData[0]
        });
    });
};
Alumni.prototype.deleteAlumni = function(id, next) {
    alumniDao.deleteAlumni(id, function(err, response) {
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
Alumni.prototype.updateAlumni = function(id, data, next) {
    alumniDao.updateAlumni(id, data, function(err, returnedData) {
        if (err) {
            next({
                result: err,
                msg: err.message,
                success: false
            }, null);
        }

        next(null, {
            success: true,
            msg: 'Alumni data successfully updated!!!',
            result: returnedData
        });
    });
};
Alumni.prototype.uploadImage = function(id, data, next) {
    alumniDao.uploadImage(id, data, function(err, response) {
        if (err) {
            next({
                result: err,
                msg: err.message,
                success: false
            }, null);
        }
        next(null, {
            result: {
                alumni_id: id,
                // product_image: config.api_host_url + '/' + data.img_default
                // img_path: data.img_path
                image_path: config.api_host_url + '/' + data.image_path
            },
            msg: 'Image successfully uploaded',
            success: true
        });
    });
};
exports.Alumni = Alumni;
