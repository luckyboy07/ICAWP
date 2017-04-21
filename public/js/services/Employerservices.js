'use strict';
(function (){

	var Employerfactory = function($http){
		var Employerfactory = {};

		Employerfactory.getEmployerdata = function (cb){
			$http.get('/Employer').success(function(data){
				cb(data);
			}).error(function(err){
				console.log(err);
			});
		};

		Employerfactory.saveEmployerdata = function(data, cb){
			$http.post('/home/EmployerForm',data).success(function(data){
				cb(data);
			}).error(function(err){
				console.log(err);
			});
		}

		Employerfactory.updateEmployerdata = function(data,cb){
			$http.put('/employerDisplay/'+ data._id,data).success(function(data){
				cb(data);
			}).error(function(err){
				console.log('Error ...',err);
			});
		};

		Employerfactory.getcompanyProfile = function(data,cb){
			$http.get('/employerDisplay/'+data).success(function(data){
				cb(data);
				console.log(data);
			}).error(function(err){
				console.log('Error ...',err);
			});
		};


		return Employerfactory;
	};

	mindanaoJobs.Services.factory('Employerfactory',['$http' ,Employerfactory]);

}());
