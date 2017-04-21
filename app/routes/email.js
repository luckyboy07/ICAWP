'use strict';

var emailCtrl = require('../controller/emailWebController');

module.exports = function(app) {

  app.route('/email/contact').post(emailCtrl.sendMail);

  app.route('/email/recover').post(emailCtrl.recoverPassword);

  app.route('/email/subscription').post(emailCtrl.sendMail);

  app.route('/email/registration').post(emailCtrl.sendMail);

}
