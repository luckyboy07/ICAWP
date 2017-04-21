'use strict'
var mysql = require('mysql');
var Database = require('../../app/utils/database').Database;
var db = new Database();
var async = require('async');
var _ = require('lodash-node');

exports.createBatch = function(data, next) {
    var str = mysql.format('INSERT INTO batches(name,description,year_graduated)' +
        'VALUES(?,?,?)', [data.name, data.description,data.year_graduated]);

    console.log('str: ', str);

    db.insertWithId(str, next);
};

exports.getAllBatch = function(next) {
    db.query(mysql.format('SELECT * FROM batches'), next);
};

exports.getBatchbyId = function(id, next) {
    db.query(mysql.format('SELECT a.* FROM batches a WHERE a.batch_id =?', [id]), next);
};

exports.deleteBatch = function(id, next) {
    db.actionQuery(mysql.format('DELETE FROM batches WHERE batch_id =?;', [id]), next);
};

exports.updateBatch = function(batch_id, data, next) {
    var str = mysql.format('UPDATE batches SET name=?,description=?,year_graduated=? WHERE batch_id=?', [data.name, data.description,data.year_graduated, batch_id]);
    console.log('data:', data);
    db.insertWithId(str, next);
}
