'use strict';

(function(){

	var UserFactory = function ($http){
		var UserFactory = {};


		UserFactory.userProfile = function(cb){
			$http.get('/home/homepage').success(function(data){
				cb(data);
			});
		};

		UserFactory.CurrentUser = function(data,cb){
			$http.get('/api/currentuser/'+ data).success(function(data){
				cb(data);
			});
		};

		UserFactory.userLogin = function(data,cb){
			$http.post('/',data).success(function(data){
				cb(data);
			}).error(function(err){
				console.log('Error ...',err);
			});
		};

		UserFactory.EmpuserLogin = function(data,cb){
			$http.post('/Employerlogin',data).success(function(data){
				cb(data);
			}).error(function(err){
				console.log('Error ...',err);
			});
		};

		UserFactory.userLogout = function(cb){
			$http.get('/logout').success(function(data){
				cb(data);
			});
		};

		UserFactory.getAllUser = function(cb) {
				$http.get('/api/users').success(function(data) {
						cb(data);
				});
		};

		UserFactory.saveUserData = function(data, cb) {
				// return $http.post('/api/employee', data);
				$http.post('/api/users', data).success(function(data) {
						cb(data);
				});
		};

		UserFactory.updateUserData = function(data, cb) {
				// return $http.post('/api/employee', data);
				$http.put('/api/users', data).success(function(data) {
						cb(data);
				});
		};

		UserFactory.signUpUser = function(data, cb) {
			$http.post('/api/users_reg', data).success(function(data) {
					cb(data);
			});
		};

		UserFactory.recoverPassword = function(data, cb) {
			$http.post('/email/recover', data).success(function(data) {
				cb(data);
			});
		};

		UserFactory.regFacebook = function(cb){
			$http.get('/auth/facebook').success(function(data){
				cb(data);
			}).error(function(err){
				console.log('Error ...',err);
			});
		};

		UserFactory.regTwitter = function(cb){
			$http.get('/auth/twitter').success(function(data){
				cb(data);
			}).error(function(err){
				console.log('Error ...',err);
			});
		};

		UserFactory.regGooglePlus = function(cb){
			$http.get('/auth/google').success(function(data){
				cb(data);
			}).error(function(err){
				console.log('Error ...',err);
			});
		};



		return UserFactory;
	};

	mindanaoJobs.Services.factory('UserFactory',['$http' ,UserFactory]);

}());
