'use strict'
var mysql = require('mysql');
var Database = require('../../app/utils/database').Database;
var db = new Database();
var async = require('async');
var _ = require('lodash-node');

exports.createPost = function(data, next) {
    var str = mysql.format('INSERT INTO wall_post(account_id,post,subject,approved,category,for_ojt,event_date,event_start,event_end,jobcourse_related) VALUES(?,?,?,?,?,?,?,?,?,?)', [data.account_id, data.post, data.subject, data.approved,
        data.category, data.for_ojt, data.event_date, data.event_start, data.event_end, data.jobcourse_related
    ]);
    db.insertWithId(str, next);
    // db.query(str, function(err, response) {
    //     console.log('response:',response);

    //     console.log('err:',err);
    // })
}
exports.getAllPost = function(next) {
    async.waterfall([
        function(callback) {
            var str = mysql.format('SELECT * FROM alumni');
            db.query(str, function(err, response) {
                if (err) {
                    next(err, null)
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

                callback(null, alumni, response);
            });
        },
        function(alumni, courses, callback) {
            var strs = mysql.format('SELECT * FROM wall_post order by date_created DESC');
            db.query(strs, function(err, response) {
                if (err) {
                    next(err, null);
                }
                _.each(alumni, function(row) {
                    row.course = _.find(courses, { 'course_id': row.course });
                });
                _.map(response, function(row) {
                    row.alumni = _.find(alumni, { 'alumni_id': row.account_id });
                });
                callback(null, response)
            });
        }
    ], next)


}
exports.getpostById = function(wall_id, next) {
    db.query(mysql.format('SELECT a.* FROM wall_post a WHERE a.wall_id =?', [wall_id]), next);
    // async.waterfall([
    //         function(callback) {
    //             var strqls = mysql.format('SELECT * FROM post_images');
    //             db.query(strqls, function(err, response) {
    //                 if (err) {
    //                     next(err, null);
    //                 }
    //                 callback(null, response);
    //             });
    //         },
    //         function(images, callback) {
    //             var str = mysql.format('SELECT a.* FROM wall_post a WHERE a.wall_id =?', [wall_id]);
    //             console.log('str:', str)
    //             db.query(str, function(err, response) {
    //                 _.each(response, function(row) {
    //                     row.post_image = _.find(images, { 'post_id': row.wall_id });
    //                 });
    //                 callback(null, response);
    //             });
    //         }
    //     ], next)

}
exports.editPost = function(wall_id, data, next) {
    var str = mysql.format('UPDATE wall_post SET account_id=?,post=?,subject=?,approved=?,category=?,for_ojt=?,event_date=?,event_start=?,event_end=?,jobcourse_related=? WHERE wall_id=?', [data.account_id, data.post, data.subject, data.approved,
        data.category, data.for_ojt, data.event_date, data.event_start, data.event_end, data.jobcourse_related, wall_id
    ]);
    db.insertWithId(str, next);
}
exports.uploadImage = function(id, data, next) {
    var str = mysql.format('UPDATE wall_post SET image_path = ? WHERE wall_id =?', [data.image_path, id]);
    db.insertWithId(str, next);
    // async.waterfall([
    //     function(callback) {
    //         db.query(mysql.format('SELECT image_path FROM post_images WHERE account_id=? LIMIT 1;', [id]), function(err, res) {
    //             console.log('res:', res);
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
    //                 console.log('image_path;', image_path);
    //                 callback(null, '');
    //             }
    //         } else {
    //             callback(null, '');
    //         }
    //     },
    //     function(result, callback) {
    //         console.log('result:', result);
    //         if (data.toDeleteFile) {
    //             if (result) {
    //                 db.query(mysql.format('UPDATE acounts_images SET image_path = ? WHERE account_id =?', [data.image_path, id]), function(err, res) {
    //                     if (err) {
    //                         callback(err, null);
    //                     }
    //                     callback(null, res);
    //                 });
    //             } else {
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
exports.deletePost = function(id, next) {
    db.actionQuery(mysql.format('DELETE FROM wall_post WHERE wall_id =?;', [id]), next);
};
