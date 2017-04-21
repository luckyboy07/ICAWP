'use strict';

var User = function (mongoose) {
	var self = this;
	var User = mongoose.model('Users');

	self.findUserByEmail =  function getUserbyUsername(email, cb){
		User.findOne({ 'email' : email }, function found(err, doc){
			//console.log(doc);
			if(err instanceof Error){
				return cb(err, null);
			} else {
				return cb(null, doc);
			}
		});
	};

	self.findUserById =  function getUserbyUsername(type, id, cb){
		if(type === 'facebook') {

			User.findOne({ 'facebook.id' : id }, function found(err, doc){

				//console.log(doc);
				if(err instanceof Error){
					return cb(err, null);
				} else {
					return cb(null, doc);
				}

			});
		}

	};

	self.saveUser = function saveSession(type, token, data, cb){
		var user = new User();

		if(type === 'facebook'){

			user.facebook.id = data.id;
			user.facebook.token = token;
			user.facebook.name = data.name.givenName + ' ' + data.name.familyName;
			user.facebook.email = data.emails[0].value;
			user.name = data.name.givenName + ' ' + data.name.familyName;
			user.email = data.emails[0].value;
			user.gender = data.gender;

			user.save(function save(err, doc){

				if(err instanceof Error){
					return cb(err, null);
				} else {
					return cb(null, doc);
				}

			});
		}

	};

};

exports.User = User;
