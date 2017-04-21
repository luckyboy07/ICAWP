'use strict';

var env = process.env.NODE_ENV || 'development';

var mysql = require('mysql');
var config = require('../../config/environment/' + env);

var Database = function () {
    var self = this;

    self.configuration = {
        host: config.db_host,
        user: config.db_user,
        password: config.db_password,
        database: config.db_name,
        port: config.db_port,
        connectTimeout: 20000
    };

    self.connect = function onConnect(callback) {
        var connection = mysql.createConnection(self.configuration);
        connection.connect(function (err) {
            if (err) {
                console.log('err code: ', err.code, 'err: ', err.Error);
                return callback(err, false);
            }
            console.log('connected as id ' + connection.threadId);
            return callback(connection, true);
        });
        connection.end();
    };

    self.query = function onQuery(sql, callback) {
        var connection = mysql.createConnection(self.configuration);
        connection.query(sql, function (err, rows) {
            if (err) {
                console.log('err:',err);
                return callback(err, null);
            }
            return callback(null, rows);
        });
        connection.end();
    };

    self.insertWithId = function onQuery(sql, callback) {
        var connection = mysql.createConnection(self.configuration);
        connection.query(sql, function (err, result) {
            if (err) {
                return callback(true, err);
            }
            return callback(false, result.insertId);
        });
        connection.end();
    };

    self.insertBulkWithId = function onQuery(sql, data, callback) {
        var connection = mysql.createConnection(self.configuration);
        connection.query(sql, data, function (err, result) {
            if (err) {
                return callback(true, err);
            }
            return callback(false, result.insertId);
        });
        connection.end();
    };

    self.actionQuery = function onQuery(sql, callback) {
        var connection = mysql.createConnection(self.configuration);
        connection.query(sql, function (err, result) {
            if (err) {
                return callback(true, err);
            }
            // console.log(result);
            return callback(false, result.affectedRows);

        });
        connection.end();
    };
};


exports.Database = Database;