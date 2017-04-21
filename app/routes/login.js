'use strict';


var async = require('async');

module.exports = function(app, config, passport) {

    var LocalStrategy = require('passport-local').Strategy;
    var mysql = require('mysql');
    var Database = require('../utils/database').Database;
    var db = new Database();

    var validatorUser = require('../validation/usersvalidation');
    var users = require('./routing/users');
    //  ===============================================================================================================
    //                                                  L O C A L
    //  ===============================================================================================================

    passport.use('cms', new LocalStrategy({ usernameField: 'username', passwordField: 'password', passReqToCallback: true },
        function(req, username, password, done) {
            // console.log('username:', username);
            // console.log('password:', password);
            var sqlString = mysql.format('SELECT  * FROM useraccount u WHERE u.username= ? LIMIT 1', [username]);
            db.query(sqlString, verifyCMSAuth(password, function(err, res) {
                if (res) {
                    // console.log('res:',res);
                    req.user = res.result.user;
                    done(null, res);
                } else {
                    res.redirect('/login');
                    done(null);
                }
            }));
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    function verifyCMSAuth(password, done) {
        return function(err, user) {
            if (err) {
                console.log('->error:', err);
                return done(err, null);
            }
            if (user && user.length > 0) {
                user = user[0];
                console.log('user:', user[0]);
                if (password !== user.password) {
                    //if (!bcrypt.compareSync(password, user.password)) {
                    console.log('->password not match with the encrypted');
                    return done(null, {
                        msg: 'Invalid Username or Password',
                        success: false,
                        result: ''
                    });
                } else {
                    console.log('password:', password);
                    console.log('user:', user);
                    console.log('SUCCESS');
                    // var token = jwt.sign(user, config.token_secret, {
                    //     expiresIn: 10000
                    // });
                    // if (user.person_type == 'Alumni') {
                    //     var sql = mysql.format('SELECT  * FROM alumni u WHERE u.alumni= ? LIMIT 1', [user.account_id]);
                    //     db.query(sql, function(err, response) {
                    //         if (err) {
                    //             next(err, null);
                    //         }
                    //         console.log('response:',response);
                    //     });
                    // }
                    done(null, {
                        msg: 'Login successfully',
                        success: true,
                        result: {
                            user: user
                                // token: token
                        }
                    });
                }
            } else {
                return done(null, {
                    msg: 'User does not exist with this Username.',
                    success: false,
                    result: ''
                });
            }

        };
    }


    app.route(config.api_version + '/login')
        .post(validatorUser.validateUser, passport.authenticate('cms', {
            session: true
        }), function onRequest(req, res) {
            if (req.user) {
                res.status(200).json(req.user);
                // res.redirect('/main');
            } else {
                // res.render('login');
                res.status(200).json({
                    err: '',
                    msg: 'Invalid Username and Password',
                    success: false
                });
            }
        });

};
