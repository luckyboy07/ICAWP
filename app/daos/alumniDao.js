'use strict';

var mysql = require('mysql');
var Database = require('../../app/utils/database').Database;
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/environment/' + env);
var db = new Database();
var functions = require('../../app/utils/functions');
var _ = require('lodash-node');
var async = require('async');
var fs = require('fs');
exports.createAlumni = function(data, next) {
    var str = mysql.format('INSERT INTO Alumni(firstname,middlename,lastname,gender,address,contactnum,email_address,course,month_graduated,year_graduate,civil,Uaccount_status,batch_name,nationality,gpa,achievement,birth_date)' +
        'VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [data.firstname, data.middlename, data.lastname, data.gender, data.address,
            data.contactnum, data.email_address, data.course, data.month_graduated, data.year_graduate, data.civil, data.Uaccount_status, data.batch_name, data.nationality, data.gpa,
            data.achievement, data.birth_date
        ]);


    db.insertWithId(str, next);
};
exports.getAlumni = function(next) {
    async.waterfall([
        function(callback) {
            var str = mysql.format('SELECT * FROM Alumni order by date_created DESC');
            db.query(str, function(err, response) {
                if (err) {
                    next(err, null);
                }
                callback(null, response);
            });
        },
        function(alumni, callback) {
            var strql = mysql.format('SELECT * FROM courses');
            db.query(strql, function(err, response) {
                if (err) {
                    next(err, null);
                }
                _.each(alumni, function(row) {
                    row.course = _.find(response, { course_id: row.course });
                })
                callback(null, alumni, response);
            });
        },
        function(alumni, course, callback) {
            var str = mysql.format('SELECT * FROM Job_history');
            db.query(str, function(err, response) {
                if (err) {
                    next(err, null);
                }
                var jobgroup = _.groupBy(response, 'alumni_id');
                _.each(alumni, function(row) {
                    row.job_history = _.filter(response, { alumni_id: row.alumni_id });
                })
                callback(null, alumni);
            });
        }
    ], next)

};

exports.getAlumniById = function(id, next) {
    async.waterfall([
        function(callback) {
            var str = mysql.format('SELECT * FROM Job_history');
            db.query(str, function(err, response) {
                if (err) {
                    next(err, null);
                }
                callback(null, response);
            });
        },
        function(job, callback) {
            var strql = mysql.format('SELECT * FROM courses');
            db.query(strql, function(err, response) {
                if (err) {
                    next(err, null);
                }
                callback(null, job, response);
            });
        },
        function(job, courses, callback) {
            console.log('job:', job);
            console.log('id:', id);
            var strql = mysql.format('SELECT a.* FROM Alumni a WHERE a.alumni_id =?', [id]);
            console.log('strql:', strql);
            db.query(strql, function(err, info) {
                if (err) {
                    next(err, null);
                }
                console.log('info:', info);
                info[0].job_history = _.filter(job, { 'alumni_id': info[0].alumni_id });
                info[0].account_course = _.find(courses, { course_id: info[0].course });
                callback(null, info);
            });
        }
    ], next)

};

exports.deleteAlumni = function(id, next) {
    db.actionQuery(mysql.format('DELETE FROM Alumni WHERE alumni_id =?;', [id]), next);
};
exports.updateAlumni = function(alumni_id, data, next) {
    async.waterfall([
        function(callback) {
            var str = mysql.format('UPDATE Alumni SET firstname=?,middlename=?,lastname=?,gender=?,address=?,contactnum=?,email_address=?,course=?,month_graduated=?,year_graduate=?,civil=?,batch_name=?,nationality=?,gpa=?,achievement=?,birth_date=? WHERE alumni_id=?', [data.firstname, data.middlename, data.lastname, data.gender, data.address,
                data.contactnum, data.email_address, data.course, data.month_graduated, data.year_graduate, data.civil, data.batch_name, data.nationality, data.gpa, data.achievement, data.birth_date, alumni_id
            ]);
            db.actionQuery(str, function(err, response) {
                if (err) {
                    next(err, null);
                }
                callback(null, alumni_id);
            });
        },
        function(alumni_id, callback) {
            if (data.job_history) {
                var sql = mysql.format('INSERT INTO Job_history(alumni_id,company_name,description,address,website,job_type,current)' +
                    'VALUES (?,?,?,?,?,?,?);', [alumni_id, data.job_history.company_name, data.job_history.description,
                        data.job_history.address, data.job_history.website, data.job_history.job_type, data.job_history.current
                    ]);
                db.insertBulkWithId(sql, function(err, res) {
                    callback(null, alumni_id);
                });

            } else {
                callback(null, alumni_id);
            }
            //     else {
            //         db.query(mysql.format('DELETE FROM quote_products WHERE alumni_id=?', [alumni_id]), function(err, response) {
            //             callback(null, alumni_id);
            //         });
            //     }
        }
    ], next);
};

exports.uploadImage = function(id, data, next) {
    var str = mysql.format('UPDATE alumni SET image_path = ? WHERE alumni_id =?', [data.image_path, id]);
    db.insertWithId(str, next);
    // async.waterfall([
    //     function(callback) {
    //         db.query(mysql.format('SELECT image_path FROM acounts_images WHERE account_id=? LIMIT 1;', [id]), function(err, res) {
    //             if (err) {
    //                 callback(err, null);
    //             }
    //             if (res && res.length > 0) {
    //                 callback(null, res[0].image_path);
    //             } else {
    //                 callback(null, '');
    //             }
    //         });
    //     },
    //     function(image_path, callback) {
    //         if (data.toDeleteFile) {
    //             if (image_path) {
    //                 if (functions.existsSync(image_path)) {
    //                     fs.unlinkSync(image_path);
    //                     callback(null, image_path)
    //                 } else {
    //                     callback(null, '');
    //                 }
    //             } else {
    //                 callback(null, '');
    //             }
    //         } else {
    //             callback(null, '');
    //         }
    //     },
    //     function(result, callback) {
    //         if (data.toDeleteFile) {
    //             if (result) {
    //                 console.log('diri isa');
    //                 db.query(mysql.format('UPDATE acounts_images SET image_path = ? WHERE account_id =?', [data.image_path, id]), function(err, res) {
    //                     if (err) {
    //                         callback(err, null);
    //                     }
    //                     callback(null, res);
    //                 });
    //             } else {
    //                 console.log('diri');
    //                 db.query(mysql.format('INSERT INTO acounts_images(account_id,image_path) VALUES(?,?) ', [id, data.image_path]), function(err, res) {
    //                     if (err) {
    //                         callback(err, null);
    //                     }
    //                     callback(null, res);
    //                 });
    //             }
    //         } else {
    //             callback(null, '');
    //         }
    //     }
    // ], next);
};
