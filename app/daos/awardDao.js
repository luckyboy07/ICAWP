'use strict'
var mysql = require('mysql');
var Database = require('../../app/utils/database').Database;
var db = new Database();
var async = require('async');
var _ = require('lodash-node');

exports.createAward = function(data, next) {
    var str = mysql.format('INSERT INTO awards(award_type,description)' +
        'VALUES(?,?)', [data.award_type, data.description]);

    console.log('str: ', str);

    db.insertWithId(str, next);
};

exports.getallAward = function(next) {
    db.query(mysql.format('SELECT * FROM awards'), next);
};

exports.getAwardById = function(id, next) {
    console.log('data_id:', id);
    db.query(mysql.format('SELECT a.* FROM awards a WHERE a.award_id =?', [id]), next);
};

exports.deleteAward = function(id, next) {
    db.actionQuery(mysql.format('DELETE FROM awards WHERE award_id =?;', [id]), next);
};

exports.updateAward = function(award_id, data, next) {
    var str = mysql.format('UPDATE awards SET award_type=?,description=? WHERE award_id=?', [data.award_type, data.description, award_id]);
    console.log('data:', data);
    db.insertWithId(str, next);
}
