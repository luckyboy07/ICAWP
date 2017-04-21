'use strict';

var cb = require('./../../utils/callback');

var postCtrl = require('../../controller/postController').Posts;
var post = new postCtrl();
var mysql = require('mysql');
var Database = require('../../utils/database').Database;
var db = new Database();

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var mkdirp = require('mkdirp');
var _ = require('lodash-node');

exports.createPost = function onRequest(req, res) {
    if (req) {
        post.createPost(req.body, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.getAllPost = function onRequest(req, res) {
    if (req) {
        post.getAllPost(cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.getpostById = function onRequest(req, res) {
    if (req) {
        post.getpostById(req.params.wall_id, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
exports.editPost = function onRequest(req, res) {
    if (req) {
        post.editPost(req.params.wall_id, req.body, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
}
exports.uploadImage = function onRequest(req, res) {
    // console.log('req.body:', req.body);
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            var dir = 'public/uploads';
            mkdirp(dir, function(err) {
                cb(err, dir);
            });
        },
        filename: function(req, file, cb) {
            cb(null, Math.floor(Date.now() / 1000) + '_' + file.originalname);
        }
    });

    var limits = {
        fileSize: 1024 * 1024 * 1024
    };

    var fileFilter = function(req, file, cb) {

        if ((file.mimetype !== 'image/png') &&
            (file.mimetype !== 'image/jpeg') &&
            (file.mimetype !== 'image/jpg') &&
            (file.mimetype !== 'image/gif') &&
            (file.mimetype !== 'image/x-ms-bmp')) {
            req.fileValidationError = 'Invalid file type. Must be .png, .jpg, .jpeg, .gif, .bmp';
            return cb(null, false, new Error('Invalid file type. Must be .png, .jpg, .jpeg, .gif, .bmp'));
        }

        cb(null, true);
    };

    var upload = multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: limits
    }).single('image_path');

    upload(req, res, function(err) {
        if (err) {
            return res.status(500).json({
                response: err,
                statusCode: 500
            });
        }
        if (req.fileValidationError) {
            return res.status(400).json({
                response: {
                    result: null,
                    msg: req.fileValidationError,
                    success: false
                },
                statusCode: 400
            });
        }

        req.body.toDeleteFile = false;
        if (!_.isUndefined(req.file)) {
            req.body.toDeleteFile = true;
            req.body.image_path = req.file.destination + '/' + req.file.filename;
        }
        post.uploadImage(req.params.id, req.body, cb.setupResponseCallback(res));
    });
};
exports.deletePost = function onRequest(req, res) {
    if (req) {
        post.deletePost(req.params.wall_id, cb.setupResponseCallback(res));
    } else {
        res.sendStatus(401);
    }
};
