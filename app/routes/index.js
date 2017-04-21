/*jshint camelcase: false */

'use strict';

var validatorAlumni = require('../validation/alumni');
var validatorEmail = require('../validation/email/email');
var validatorUser = require('../validation/usersvalidation');
var validatorPost = require('../validation/postingvalidation');
var validatorJob = require('../validation/jobvalidation');
var validatorAward = require('../validation/award');
var validatorBatch = require('../validation/batch');
var validatorCourse = require('../validation/course');
// ======================== ROUTING ============================ //
var user_accounts = require('./routing/user_accounts');
var alumni = require('./routing/alumni');
var post = require('./routing/post');
var generateuser = require('./routing/generateuser');
var jobhistory = require('./routing/jobhistory');
var email = require('./routing/email');
var course = require('./routing/course');
var batch = require('./routing/batch');
var award = require('./routing/award');

module.exports = function(app, passport, config, middleware) {
    app.route('/')
        .get(middleware.isLoggedIn, function onRequest(req, res) {
            res.render('index');
        });

    app.route('/logout')
        .get(function onRequest(req, res) {
            // req.session.distory();
            req.logout();
            res.redirect('/login');
        });

    app.route('/main')
        .get(function onRequest(req, res) {
            // res.render('main');
            res.render('login');
        });

    // ======================== FILTERS ============================ //
    // app.route(config.api_version + '/filters')
    //     .get(filters.filterData);


    app.route(config.api_version + '/useraccounts')
        // .post(validatorUser.validateUser, user_accounts.createUser);
        .get(user_accounts.getAllUser);

    app.route(config.api_version + '/alumni')
        .post(validatorAlumni.validateAlumni, alumni.createAlumni)
        .get(alumni.getAlumni);

    app.route(config.api_version + '/course')
        .post(validatorCourse.validateCourse,course.createCourse)
        .get(course.getAllcourse);
    app.route(config.api_version + '/batch')
        .post(validatorBatch.validateBatch,batch.createBatch)
        .get(batch.getAllBatch);
    app.route(config.api_version + '/course/:id')
        .get(course.getCourseById)
        .delete(course.deleteCourse)
        .put(validatorCourse.validateCourse,course.updateCourse);

    app.route(config.api_version + '/passwordreset/:id')
        .get(user_accounts.resetPassword);

    app.route(config.api_version + '/batch/:id')
        .get(batch.getBatchbyId)
        .delete(batch.deleteBatch)
        .put(batch.updateBatch);

    app.route(config.api_version + '/alumni/:id')
        .get(alumni.getAlumniById)
        .delete(alumni.deleteAlumni)
        .put(validatorAlumni.validateAlumni, alumni.updateAlumni);

    app.route(config.api_version + '/wallpost')
        .get(post.getAllPost)
        .post(validatorPost.validatePost, post.createPost);

    app.route(config.api_version + '/wallpost/:wall_id')
        .get(post.getpostById)
        .put(post.editPost)
        .delete(post.deletePost);

    app.route(config.api_version + '/jobhistory')
        .get(jobhistory.getAlljob);

    app.route(config.api_version + '/jobhistory/:id')
        .get(jobhistory.getjobhistoryByid)
        .post(validatorJob.validateJob, jobhistory.createJobHistory)
        .put(jobhistory.updatejobhistory);

    app.route(config.api_version + '/alumni/:id/upload-image')
        .put(alumni.uploadImage);

    app.route(config.api_version + '/wallpost/:id/upload-image')
        .put(post.uploadImage);

    app.route(config.api_version + '/username')
        .post(generateuser.generateUser)
    app.route(config.api_version + '/username/:id')
        .get(generateuser.getUserById)
        .put(generateuser.updateUser);

    // app.route(config.api_version + '/getuser')

    //     .get(function onRequest(req, res) {
    //         console.log('req:', req.user);
    //         // res.status(200).send(req.user);
    //         res.status(200).json({
    //             response: req.user,
    //             statusCode: 200
    //         }).end();
    //     });
    app.route(config.api_version + '/getuser')
        .get(passport.authenticate('cms', { session: false }),
            function(req, res) {
                // console.log('WALA1');
                // console.log('res:', res);
                res.json(req.user);
            });
    app.route(config.api_version + '/email')
        .post(email.sendEmail);

    app.route(config.api_version + '/award')
        .post(validatorAward.validateAward, award.createAward)
        .get(award.getallAward);

    app.route(config.api_version + '/award/:id')
        .get(award.getAwardById)
        .delete(award.deleteAward)
        .put(award.updateAward);
};
