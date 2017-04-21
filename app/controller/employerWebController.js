'use strict';

var employerService = require('../services/employerService').employer;
var employer = new employerService();
var path = require('path');
var fs = require('fs-extra');

//Create
exports.createEmployer = function(req, res) {

    // console.log('this is body',req.body);
    //  console.log('this is original',req.files.file);
    // console.log('this is data',req.files.file.ws.path);

    // var imagename = Date.now() +'' + path.extname(req.files.file.originalFilename).toLowerCase();
    // var tempPath = req.files.file.ws.path;
    // var targetPath = path.resolve('./public/img/users/'+ imagename);
    // if (path.extname(req.files.file.originalFilename).toLowerCase() === '.png' || path.extname(req.files.file.originalFilename).toLowerCase() === '.jpg' || path.extname(req.files.file.originalFilename).toLowerCase() === '.jpeg' || path.extname(req.files.file.originalFilename).toLowerCase() === '.gif') {
    //     fs.copy(tempPath, targetPath, function(err) {
    //         if (err) throw err;
    //         console.log("Upload completed!");
    //     });
    // } else {
    //     fs.unlink(tempPath, function () {
    //         if (err) throw err;
    //         console.error("Only .png files are allowed!");
    //     });
    // }

    // var data = new Array();
    // objectData = new Object();
    // employer.image = './public/img/users/'+ imagename;

    // data.push(objectData);
    // data.push(req.body);
    // console.log(data);
    employer.CreateEmployer(req.body, setupResponseCallback(res));
}

//Read
exports.readeEmployer = function(req, res) {
  employer.ReadEmployer(req.body, setupResponseCallback(res));
}

exports.readEmployerByid = function(req, res) {
    employer.ReadEmployerByid(req.params._id, setupResponseCallback(res));
}

//Update
exports.updateemployer = function(req, res) {

    req.body.image = req.body._id +''+path.extname(req.files.file.originalFilename).toLowerCase();
    var imagename = req.body._id +'' + path.extname(req.files.file.originalFilename).toLowerCase();
    var tempPath = req.files.file.ws.path;
    var targetPath = path.resolve('./public/img/users/'+ imagename);
    if (path.extname(req.files.file.originalFilename).toLowerCase() === '.png' || path.extname(req.files.file.originalFilename).toLowerCase() === '.jpg' || path.extname(req.files.file.originalFilename).toLowerCase() === '.jpeg' || path.extname(req.files.file.originalFilename).toLowerCase() === '.gif') {
        fs.copy(tempPath, targetPath, function(err) {
            if (err) throw err;
            console.log('GET TO SAVE ',req.body);
           employer.UpdateEmployer(req.params._id, req.body, setupResponseCallbackForUpdate(res));
        });
    } else {
        fs.unlink(tempPath, function () {
            if (err) throw err;
            console.error("Only .png files are allowed!");
        });
    }

}

//Delete
exports.deleteEmployer = function(req, res) {
    employer.DeleteEmployer(req.params._id, setupResponseCallback(res));
}

function setupResponseCallback(res) {
    return function(err, returnValue) {
        if (err instanceof Error) {
            throw err;
        } else {
            res.status(200).send(returnValue);
        }
    }
}

function setupResponseCallbackForUpdate(res) {
    return function(err, returnValue) {
        if (err instanceof Error) {
            throw err;
        } else {
            res.send(200,returnValue);
        }
    }
}
