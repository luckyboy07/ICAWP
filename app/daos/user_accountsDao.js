'use strict';

var mysql = require('mysql');
var Database = require('./../utils/database').Database;
var db = new Database();
var async = require('async');
var _ = require('lodash-node');
var bcrypt = require('bcrypt-nodejs');

var env = process.env.NODE_ENV || 'development';
var config = require('../../config/environment/' + env);



// exports.getUserByEmail = function(email, next) {
//     db.query(mysql.format('SELECT U.uc_id,U.username,U.valid_until,E.person_id,U.effective_date,U.valid_until,U.role_id,CONCAT(E.lastname,", ",E.firstname) AS EmpName,E.isActive,' +
//         '(SELECT `name` FROM store_info WHERE store_id = E.store_id LIMIT 1) AS StoreInfo,U.recovery_email_hash,U.activation_hash,U.date_created,U.date_updated ' +
//         'FROM user_accounts U INNER JOIN person E ON U.person_id = E.person_id WHERE E.email =?;', [email]), next);
// };

exports.createUser = function(data, next) {
    //data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(8), null);
    // data.valid_until = new Date(data.valid_until).toISOString().slice(0, 19).replace('T', ' ');

    var str = mysql.format('INSERT into UserAccount(account_id, username,password,person_type) ' +
        'VALUES (?,?,?,?)', [
            data.account_id, data.username, data.password, data.person_type
        ]);

    db.insertWithId(str, next);

};

exports.getAllUser = function(next) {
    // db.query(mysql.format('SELECT a.uc_id,a.username,a.person_type,CONCAT(p.lastname,", ",p.firstname) AS Name, p.Uaccount_status FROM useraccount a INNER JOIN alumni p ON a.account_id = p.alumni_id'), next);
    // db.query(mysql.format('SELECT a.uc_id,a.username,a.password,a.person_type, p.* FROM alumni p INNER JOIN useraccount a ON a.account_id = p.alumni_id'),next);
    async.waterfall([
        function(callback) {
            var str = mysql.format('SELECT * FROM useraccount');
            db.query(str, function(err, response) {
                if (err) {
                    next(err, null);
                }
                callback(null, response);
            });
        },
        function(accounts, callback) {
            var strs = mysql.format('SELECT * FROM alumni');
            db.query(strs, function(err, response) {
                if (err) {
                    next(err, null);
                }
                _.each(response, function(row) {
                    row.name = row.firstname + ',' + row.lastname;
                    row.useraccount = _.find(accounts, { 'account_id': row.alumni_id });
                });
                callback(null, response);
            });
        }
    ], next)
};

exports.deleteUser = function(id, next) {
    var query = mysql.format('DELETE FROM user_accounts WHERE uc_id = ?', [id]);
    db.actionQuery(query, next);
};

exports.updateUser = function(id, data, next) {
    var user_accounts = {};
    user_accounts.username = data.username;
    //user_accounts.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(8), null);
    user_accounts.password = data.password;
    user_accounts.emp_id = data.emp_id;
    user_accounts.role_id = data.role_id;
    user_accounts.valid_until = new Date(data.valid_until).toISOString().slice(0, 19).replace('T', ' ');
    console.log('user_accounts: ', user_accounts);

    // i am using this structure(async waterfall) for later purposes
    async.waterfall([
        function(cb) {
            var str = mysql.format('UPDATE user_accounts SET ? WHERE uc_id = \'' + id + '\'', user_accounts);
            db.actionQuery(str, function(err2, result) {
                if (err2) {
                    cb(err2, null);
                } else {
                    cb(null, result);
                }
            });
        }
    ], next);
};

exports.checkUserNameIfExist = function(username, next) {
    var str = mysql.format('SELECT * FROM user_accounts WHERE `username` LIKE ? LIMIT 1', ['%' + username + '%']);
    db.query(str, next);
};

exports.checkEmployeeIfExist = function(id, next) {
    var str = mysql.format('SELECT * FROM user_accounts WHERE `person_id` =? LIMIT 1', [id]);
    db.query(str, next);
};

exports.updateCurrentUserProfile = function(p_id, data, next) {
    db.actionQuery(mysql.format('UPDATE person SET lastname=?,firstname=?,mobile=?,address=?,email=?,timeZone=?,displayName=? WHERE person_id=?', [
        data.lastname, data.firstname, data.mobile, data.address, data.email, data.timeZone, data.displayName, p_id
    ]), next);
};

exports.updateCurrentUserUsername = function(data, next) {
    async.waterfall([
        function(callback) {
            db.actionQuery(mysql.format('UPDATE user_accounts SET username=? WHERE uc_id=?', [data.username, data.uc_id]), function(err, response) {
                if (err) {
                    callback(err, null);
                }
                callback(null, true);
            });
        },
        function(success, callback) {
            var str = 'SELECT uc_id,username,recovery_email,person_id,is_active,sub_id,role_id,effective_date,valid_until FROM user_accounts WHERE `uc_id` =\'' + data.uc_id + '\' LIMIT 1';
            db.query(str, function(err, response) {
                if (err) {
                    callback(err, null);
                }
                callback(null, response);
            });
        }
    ], next);
};

exports.updateCurrentUserPassword = function(data, next) {
    async.waterfall([
        function(callback) {
            //data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(8), null);
            db.query(mysql.format('UPDATE user_accounts SET password=? WHERE uc_id=?', [data.password, data.uc_id]), function(err, response) {
                if (err) {
                    callback(err, null);
                }
                callback(null, true);
            });
        },
        function(success, callback) {
            var str = 'SELECT uc_id,username,recovery_email,person_id,is_active,sub_id,role_id,effective_date,valid_until FROM user_accounts WHERE `uc_id` =\'' + data.uc_id + '\' LIMIT 1';
            db.query(str, function(err, response) {
                if (err) {
                    callback(err, null);
                }
                callback(null, response);
            });
        }
    ], next);
};

exports.updateCurrentUserEmailRecovery = function(data, next) {
    data.recovery_email_hash = data.uc_id;
    async.waterfall([
        function(callback) {
            db.query(mysql.format('UPDATE user_accounts SET recovery_email=?,recovery_email_hash = SHA1(MD5(?)),date_recovery_validated=null WHERE uc_id=?', [
                data.email_recovery, data.recovery_email_hash, data.uc_id
            ]), function(err, response) {
                if (err) {
                    callback(err, null);
                }
                callback(null, true);
            });
        },
        function(success, callback) {
            var str = 'SELECT uc_id,username,recovery_email,person_id,is_active,sub_id,role_id,effective_date,valid_until FROM user_accounts WHERE `uc_id` =\'' + data.uc_id + '\' LIMIT 1';
            db.query(str, function(err, response) {
                if (err) {
                    callback(err, null);
                }
                callback(null, response);
            });
        }
    ], next);

};

exports.updateCurrentUserConfirmEmailRecovery = function(uc_id, next) {
    db.query(mysql.format('UPDATE user_accounts SET date_recovery_validated=NOW() WHERE uc_id=?', [uc_id]), next);
};

exports.checkIfVerified = function(hash_key, next) {
    var sqlStr = mysql.format('SELECT uc_id,username,recovery_email,person_id,is_active,sub_id,role_id,effective_date,valid_until ' +
        'FROM user_accounts WHERE activation_hash =? AND date_activated IS NOT NULL LIMIT 1', [hash_key]);
    db.query(sqlStr, next);
};

exports.verifyUser = function(hash_key, next) {
    var sqlStr = mysql.format('UPDATE user_accounts SET date_activated=NOW(), is_active=1 WHERE activation_hash = ?', [hash_key]);
    db.query(sqlStr, function(err, result) {
        console.log('result: ', result);
        if (result) {
            var sqlStrs = mysql.format('SELECT U.uc_id,U.username,U.password,E.firstname,E.email ' +
                'FROM user_accounts U INNER JOIN person E ON U.person_id = E.person_id WHERE U.activation_hash =?;', [hash_key]);
            console.log('sqlStrs: ', sqlStrs);

            db.query(sqlStrs, function(err, response) {
                console.log('response: ', response);

                if (response && response.length > 0) {
                    response = response[0]
                }
                next(null, response);
            });
        }
    });
};
var generateString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

exports.resetPassword = function(id, next) {
    var newpass = generateString(8);
    console.log('id:', id);

    var sqlStr = mysql.format('UPDATE useraccount SET password=? WHERE uc_id = ?', [newpass, id]);

    db.actionQuery(sqlStr, function(err, response) {
        if (response) {
            db.query(mysql.format('SELECT a.* FROM useraccount a WHERE a.uc_id = ?', [id]), function(err, result) {
                next(null, result);
            })
        }
    });
};
