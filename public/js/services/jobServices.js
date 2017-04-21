'use strict';

var jobFactory = function($http){
	var jobFactory = {};

	jobFactory.saveJob = function(data, cb){
		console.log('services console', data);
		$http.post('/api/jobs',data)
			.success(function(data){
				cb(data);
			})
			.error(function(err){
				console.log(err);
			})
	}

	jobFactory.getJobs = function(cb){
		$http.get('/api/jobs').success(function(data){
			cb(data);
		}).error(function(err){
			console.log(err);
		});
	}

	jobFactory.getJobsEmpBase = function(data,callback){
		console.log(data);
		$http.get('/api/jobsEmpbase/' + data._id).success(function(data){
			callback(data);
		}).error(function(err){
			console.log('Error ...',err);
		});
	};

	jobFactory.showJobDetails = function(data,callback){
		console.log(data);
		$http.get('/jobdetails/'+data).success(function(data){
			callback(data);
		}).error(function(err){
			console.log('Error ...',err);
		});
	};

	jobFactory.companyProfile = function(data,cb){
		$http.get('/CompanyProfile/'+ data).success(function(data){
			cb(data);
		}).error(function(err){
			console.log('Error ...',err);
		});
	};

	jobFactory.UpdateJob = function(data,callback){
		$http.put('/api/jobs/'+ data._id).success(function(data){
			callback(data);
		}).error(function(err){
			console.log('Error ...',err);
		});
	};

	return jobFactory;

}

mindanaoJobs.Services.factory('jobFactory',['$http',jobFactory]);
