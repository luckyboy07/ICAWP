'use strict';

var mysql = require('mysql');
var Database = require('../../app/utils/database').Database;
var db = new Database();
var functions = require('../../app/utils/functions');
var _ = require('lodash-node');
var async = require('async');
var fs = require('fs');

exports.getAlljob = function(next) {
    async.waterfall([
        function(callback) {
            var str = mysql.format('SELECT * FROM Alumni');
            db.query(str, function(err, response) {
                if (err) {
                    next(err, null);
                }
                callback(null, response);
            });
        },function(alumni,callback){
            var strql = mysql.format('SELECT * FROM courses');
            db.query(strql, function(err, response) {
                if (err) {
                    next(err, null);
                }
                _.each(alumni,function(row){
                   row.course = _.find(response,{course_id:row.course});
                })
                callback(null, alumni,response);
            });
        },
        function(alumni,course, callback) {
            var str = mysql.format('SELECT * FROM Job_history order by date_created DESC');
            db.query(str, function(err, response) {
                if (err) {
                    next(err, null);
                }
                _.each(response, function(row) {
                    row.alumni = _.find(alumni,{'alumni_id':row.alumni_id});
                    row.course = _.find(course,{'course_id':row.alumni.course.course_id});
                })
                callback(null,response);
            });
        }
    ], next)

};

exports.getjobhistoryByid = function(id, next) {
    // var str = mysql.format('SELECT a.* FROM Job_history a WHERE a.alumni_id=?',[id]);
    // db.query(str,next);
    db.query(mysql.format('SELECT a.* FROM Job_history a WHERE a.alumni_id=?', [id]), next);

};

exports.updatejobhistory = function(company_id, data, next) {
    console.log('company_id:', company_id);
    var str = mysql.format('UPDATE Job_history SET company_name=?,position=?,address=?,website=?,description=?,job_type=?,job_related=?,`current`=?,remarks=? WHERE company_id=?', [
        data.company_name, data.position, data.address, data.website, data.description, data.job_type, data.job_related, data.current,data.remarks, company_id
    ]);
    console.log('str11:', str);
    db.actionQuery(str, next);
};

exports.createJobHistory = function(alumni_id, data, next) {
    console.log('data:', data);
    var str = mysql.format('INSERT INTO Job_history(alumni_id,company_name,position,address,website,description,job_type,date_from,date_to,job_related,current,remarks)' +
        'VALUES(?,?,?,?,?,?,?,?,?,?,?,?)', [alumni_id, data.company_name, data.position, data.address, data.website, data.description,
            data.job_type, data.date_from, data.date_to, data.job_related, data.current,data.remarks
        ]);

    console.log('str: ', str);

    db.insertWithId(str, next);
};
