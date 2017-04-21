'use strict';

var userService = require('../services/userService').User;
var User = new userService();

var fs = require('fs-extra');
var path = require('path');
var crypto = require('crypto');


// Save data
exports.saveUser = function(req, res) {
    User.saveUser(req.body, setupResponseCallback(res));
};

//Update User
exports.updateUser = function(req, res) {
    User.updateUser(req.body._id, req.body, setupResponseCallback(res));
}

// Find User
exports.findUser = function(req, res) {
    var id = req.params.id;
    console.log(req.params);
    User.findUser(id, setupResponseCallback(res));
};

// Find By Value
exports.findUserByValue = function(req, res) {
    User.findUserByValue(req.body, setupResponseCallback(res));
}

// Get All User
exports.getAllUser = function(req, res) {
    User.getAllUser(setupResponseCallback(res));
};

// Count All User
exports.countUser = function(req, res) {
    User.countUser(setupCountResponseCallback(res))
};

// Delete User By Id
exports.deleteUserByID = function(req, res) {
    User.deleteUserByID(req.params.id, setupResponseCallback(res));
}

exports.ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}

exports.recoverUserPassword = function(req, res) {
    User.recoverUserPassword(req.body._id, setupResponseCallback(res));
}

exports.uploadPic = function(req, res) {
    console.log('upload profile pic');
    console.log(req.body);
    console.log(req.file);

    /*var destPath = path.join(__dirname, "../../upload/images/");
    var originalFilename = req.files.file.originalFilename;
    var hashName = crypto.createHash('md5').update(originalFilename).digest('hex') + ".jpeg";
    var writeStream = req.files.file.ws;

    //if the file already exists in the path, then create a random file name from hashName.
    while (fs.existsSync(destPath + hashName)) {
        hashName = hashName.substring(0, hashName.length - 5);
        var rnd = crypto.randomBytes(3),
            value = new Array(3),
            len = hashName.length;
        for (var i = 0; i < 3; i++) {
            value[i] = hashName[rnd[i] % len];
        };
        hashName = hashName + value.join('') + ".jpeg";
    }

    fs.copy(writeStream.path, destPath + hashName, function(err,returnValue) {
      if (err instanceof Error) {
          throw err;
      } else {

          fs.chmodSync(destPath + hashName, '755'); //there is probably a better solution, I have to change the permission to access the file from public images directory
          fs.remove(writeStream.path, function(err) {
              if (err) return res.error(err);
          });

          res.status(200).send(returnValue);
      }
    });*/
}

exports.uploadResume = function(req, res, next) {
    console.log('upload resume');
    console.log(req.body);
    console.log(req.file);

    /*var destPath = path.join(__dirname, "../../upload/resume/");
    var originalFilename = req.files.file.originalFilename;
    var hashName = crypto.createHash('md5').update(originalFilename).digest('hex') + ".docx";
    var writeStream = req.files.file.ws;

    //if the file already exists in the path, then create a random file name from hashName.
    while (fs.existsSync(destPath + hashName)) {
        hashName = hashName.substring(0, hashName.length - 5);
        var rnd = crypto.randomBytes(3),
            value = new Array(3),
            len = hashName.length;
        for (var i = 0; i < 3; i++) {
            value[i] = hashName[rnd[i] % len];
        };
        hashName = hashName + value.join('') + ".docx";
    }

    fs.copy(writeStream.path, destPath + hashName, function(err,returnValue) {
        if (err instanceof Error) {
            throw err;
        } else {

            fs.chmodSync(destPath + hashName, '755'); //there is probably a better solution, I have to change the permission to access the file from public images directory
            fs.remove(writeStream.path, function(err) {
                if (err) return res.error(err);
            });

            res.status(200).send(returnValue);
        }
    });*/
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

function setupArrayResponseCallback(res) {
    return function(err, returnValue) {
        if (err instanceof Error) {
            throw err;
        } else {
            res.status(200).send([returnValue]);
        }
    }
}

function setupCountResponseCallback(res) {
    return function(err, returnValue) {
        if (err instanceof Error) {
            throw err;
        } else {
            res.status(200).send({
                length: returnValue
            });
        }
    }
}
