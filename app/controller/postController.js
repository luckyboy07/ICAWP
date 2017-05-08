'use strict';

var env = process.env.NODE_ENV || 'development';
var config = require('../../config/environment/' + env);
var _ = require('lodash-node');

var postDao = require('./../daos/postsDao');

function Posts() {
    this.postDao = postDao;
}

Posts.prototype.createPost = function(data, next) {
    postDao.createPost(data, function(err, returnedData) {
        if (!err) {
            next(null, {
                success: true,
                msg: 'Post Successfully Created',
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
Posts.prototype.getAllPost = function(next) {
    postDao.getAllPost(function(err, returnedData) {
        if (err) {
            next({
                result: err,
                msg: err.message,
                success: false
            }, null);
        } else {
            _.each(returnedData, function(row) {
                if (row.post_image) {
                    var pathname = row.post_image.image_path;
                    row.image_path = config.api_host_url + '/' + pathname;
                }
            });
            next(null, {
                result: returnedData,
                msg: 'SUCCESS',
                success: true
            });
        }
    });
};
Posts.prototype.getpostById = function(id, next) {
    postDao.getpostById(id, function(err, returnedData) {
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
Posts.prototype.editPost = function(id, data, next) {
    postDao.editPost(id, data, function(err, returnedData) {
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
Posts.prototype.uploadImage = function(id, data, next) {
    postDao.uploadImage(id, data, function(err, response) {
        if (err) {
            next({
                result: err,
                msg: err.message,
                success: false
            }, null);
        }
        next(null, {
            result: {
                post_id: id,
                // product_image: config.api_host_url + '/' + data.img_default
                // img_path: data.img_path
                image_path: config.api_host_url + '/' + data.image_path
            },
            msg: 'Image successfully uploaded',
            success: true
        });
    });
};
Posts.prototype.deletePost = function(id, next) {
    postDao.deletePost(id, function(err, response) {
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
exports.Posts = Posts;
