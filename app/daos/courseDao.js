'use strict'
var mysql = require('mysql');
var Database = require('../../app/utils/database').Database;
var db = new Database();
var async = require('async');
var _ = require('lodash-node');

exports.createCourse = function(data, next) {
    var str = mysql.format('INSERT INTO courses(name,description,curr_years)' +
        'VALUES(?,?,?)', [data.name, data.description,data.curr_years]);


    db.insertWithId(str, next);
};

exports.getAllcourse = function(next) {
    db.query(mysql.format('SELECT * FROM courses'), next);
};

exports.getCourseById = function(id, next) {
    db.query(mysql.format('SELECT a.* FROM courses a WHERE a.course_id =?', [id]), next);
};

exports.deleteCourse = function(id, next) {
    db.actionQuery(mysql.format('DELETE FROM courses WHERE course_id =?;', [id]), next);
};

exports.updateCourse = function(course_id, data, next) {
    var str = mysql.format('UPDATE courses SET name=?,description=?,curr_years=? WHERE course_id=?', [data.name, data.description,data.curr_years, course_id]);
    db.insertWithId(str, next);
}
