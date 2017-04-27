'use strict'
var mysql = require('mysql');
var Database = require('../../app/utils/database').Database;
var db = new Database();
var async = require('async');

var generateString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

exports.generateUser = function(data, next) {
    console.log('data:', data);
    var newpass = generateString(8);
    var newuser = generateString(4);
    var person_type = 'Alumni';


    async.waterfall([
        function(callback) {
            var str = mysql.format('INSERT INTO useraccount(account_id,username,password,person_type) VALUES(?,?,?,?)', [data.account_id, data.student_id, newpass, person_type]);
            // db.insertWithId(str, next);
            console.log('str:');
            db.query(str, function(err, response) {
                if (err) {
                    next(err, null);
                }
                callback(null, response);
            });
        },
        function(account, callback) {
            console.log('account;', account);
            var strq = mysql.format('UPDATE Alumni SET Uaccount_status=1 WHERE alumni_id=?', [data.account_id]);
            console.log('strq:', strq);
            db.query(strq, function(err, response) {
                if (err) {
                    next(err, null);
                }
                callback(null, account, response);
            });
        },
        function(account, update, callback) {
            var strq = mysql.format('SELECT a.* from useraccount a WHERE account_id=?', [data.account_id]);
            db.query(strq, function(err, response) {
                if (err) {
                    next(err, null);
                }
                callback(null, response);
            });
        }
    ], next)
}
exports.getUserById = function(id, next) {
    db.query(mysql.format('SELECT a.* FROM useraccount a WHERE a.account_id =?', [id]), next);
}
exports.updateUser = function(user_id, data, next) {
    var str = mysql.format('UPDATE UserAccount SET username=?,password=?,person_type=? WHERE uc_id=?', [data.username, data.password,
        data.person_type, user_id
    ]);
    db.actionQuery(str, next);
}
