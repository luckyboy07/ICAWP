'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('Users');

// Save data
exports.saveUser = function saveUser(data, next) {
    User.create(data, next);
};

// Update User
exports.updateUser = function updateUser(value, data, next) {
    User.findByIdAndUpdate(value, data, next);
};

// Find By Id
exports.findUser = function findUser(id, next) {
    User.findById(id, next);
};

exports.findUserByValue = function findUserByEmail(value,next){
    User.findOne(value,next);
}

// Delete By Id
exports.deleteUserByID = function deleteUserByID(id, next) {
    User.findByIdAndRemove(id, next);
}

// Get All User
exports.getAllUser = function getAllUser(next) {
    User.find(next);
};

//Count all User
exports.countUser = function countUser(next) {
    User.find().count(next);
};

// Recover User Password
exports.recoverUserPassword = function recoverUserPassword(id,next){
  User.find(next).select('Password');
};

exports.findUserBySocial = function findUserBySocial(type,id,cb){
  if (type === 'facebook'){
    User.findOne({ 'facebook.id' : id }, function found(err, doc){
				if(err instanceof Error){
					return cb(err, null);
				} else {
					return cb(null, doc);
				}

			});
  }else if(type === 'twitter'){

    User.findOne({ 'twitter.id' : id }, function found(err, doc){
        if(err instanceof Error){
          return cb(err, null);
        } else {
          return cb(null, doc);
        }

      });
  }else if(type === 'google'){

    User.findOne({ 'google.id' : id }, function found(err, doc){
        if(err instanceof Error){
          return cb(err, null);
        } else {
          return cb(null, doc);
        }

      });
  }
}

exports.saveUserBySocial = function saveUserBySocial(type,token,data,next){
    var user = new User();

    if (type === 'facebook'){

      user.facebook.id = data.id;
			user.facebook.token = token;
			user.facebook.name = data.name.givenName + ' ' + data.name.familyName;
			user.facebook.email = data.emails[0].value;
			user.FirstName = data.name.givenName;
      user.LastName = data.name.familyName;
			user.email = data.emails[0].value;
			user.gender = data.gender;
      user.confirm = true;

			user.save(next);

    }else if(type === 'twitter'){
      user.twitter.id = data.id;
      user.twitter.token = token;
      user.twitter.displayName = data.displayName;
      user.twitter.username = data.username;
      user.FirstName = data.displayName;
      user.LastName = '';
      user.email = '';
      user.gender = '';
      user.photo = data.photos[0].value;
      user.address = data._json.location;
      user.confirm = true;

      user.save(next);

    }else if(type === 'google'){
      user.google.id = data.id;
      user.google.token = token;
      user.google.name = data.displayName;
      user.google.email = data.emails[0].value;
      user.FirstName = data.name.givenName;
      user.LastName = data.name.familyName;
      user.email = data.emails[0].value;
      user.gender = data._json.gender;
      user.photo = data._json.picture;
      user.confirm = true;

      user.save(next);
    }
}
