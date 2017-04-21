'use strict';

var userDao = require('./../daos/user_accountsDao');

function Users() {
    this.userDao = userDao;
}

Users.prototype.createUser = function(data, next) {
    userDao.createUser(data, function(err, response) {
        if (err) {
            next({
                result: err,
                msg: err.message,
                success: false
            }, null);
        }
        next(null, {
            result: response,
            msg: 'Record Successfully Saved',
            success: true
        });
    });
}
Users.prototype.getAllUser = function(next) {
    userDao.getAllUser(function(err, returnedData) {
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
Users.prototype.getUserById = function(id, next) {
    userDao.getUserById(id, function(err, returnedData) {
        if (err) {
            next({
                result: err,
                msg: err.message,
                success: false
            }, null);
        }
        _.each(returnedData, function(row) {
            var pathname = row.image_path;
            row.image_path = config.api_host_url + '/' + pathname;
        });
        next(null, {
            success: true,
            msg: '',
            result: returnedData[0]
        });
    });
};
Users.prototype.deleteUser = function(id, next) {
    userDao.deleteUser(id, function(err, response) {
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
Users.prototype.updateUser = function(id, data, next) {
    userDao.updateUser(id, data, function(err, returnedData) {
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
Users.prototype.resetPassword = function(id,next) {
    userDao.resetPassword(id, function(err, returnedData) {
        if (err) {
            next({
                result: err,
                msg: err.message,
                success: false
            }, null);
        }

        next(null, {
            success: true,
            msg: 'Password successfully changed!',
            result: returnedData[0]
        });
    });
};
exports.Users = Users;
