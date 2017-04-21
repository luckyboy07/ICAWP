'use strict'
var cb = require('./../../utils/callback');

var emailCtrl = require('../../controller/emailController').Email;
var email = new emailCtrl();

exports.sendEmail = function onRequest(req, res) {
    email.sendEmail(req.body, cb.setupResponseCallback(res));
};