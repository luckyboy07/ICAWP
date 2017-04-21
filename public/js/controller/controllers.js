'use strict';

var mainCtrl = function($scope, $location, UserFactory, Defaultfactory) {

    UserFactory.userProfile(function(data) {
        $scope.user = data;
    });

    $scope.show = localStorage.getItem('Person');

    Defaultfactory.getAllJobLocation(function(data) {
        $scope.joblocation = data;
        $scope.newlocation = data;
    });

    Defaultfactory.getAllJobCategories(function(data) {
        $scope.jobcategories = data;
    });
}

var aboutCtrl = function($scope) {
    $scope.pageClass = "page-home";
    $scope.click = function(data) {
        $scope.pageClass = "page-about";
    }
}

var jobCtrl = function($scope, $location, $filter, jobFactory, UserFactory, Defaultfactory) {
    $scope.layout = 'detailed';
    $scope.job = {};
    $scope.search = {};

    $scope.job.qualification = [{
        qualify: ''
    }];
    $scope.job.requirements = [{
        require: ''
    }];

    $scope.job.skills = [{
        name: ''
    }];
    $scope.basis = [{type: 'Full-time'},{type: 'Part-time'},{type: 'Contract'}];

    Defaultfactory.getAllJobLocation(function(data) {
        $scope.joblocation = data;
        $scope.newlocation = data;
    });

    Defaultfactory.getAllJobCategories(function(data) {
        $scope.jobcategories = [];
        $scope.jobcategories = data;
    });


    UserFactory.userProfile(function(data) {
        $scope.job.emp_id = data._id;
    });

    jobFactory.getJobs(function(data) {
        $scope.disJob = data;
    });

    $scope.submitForm = function(valid) {
        console.log($scope.job);
        if (!valid) {
            alert('Fill up all fields');
        } else {
            jobFactory.saveJob($scope.job, function(data) {
                $location.path('/MyJobs');
            });
        }
    }

    $scope.categoriesfilter = function(data){
        console.log(data);
    }
}


var modalController = function($scope, $modalInstance,UserFactory) {
    $scope.UserSpecial = {};

    $scope.UserSpecial.specialization = [{
        specialization: ''
    }];

    $scope.saveUserSpecialization = function() {
        console.log('saveUserSpecialization');
        var arr = new Array();

        $('input.item-check:checkbox:checked').each(function() {
            var spc = new Object();
            spc.specialization = $(this).val();
            arr.push(spc);
        });

        $scope.UserSpecial.specialization = arr;

        console.log('saveUserSpecialization', $scope.UserSpecial);

        UserFactory.updateUserData($scope.UserSpecial, function(data) {
            console.log('update User Specialization', data);
        });
    }

    $scope.ok = function() {
        $modalInstance.close($scope.selected.item);
        console.log('ok');
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
        console.log('cancel');
    };
}

var jobDetailsCtrl = function($scope,$routeParams,jobFactory){
    $scope.details = {};
    jobFactory.showJobDetails($routeParams._id,function(data){
        $scope.details = data;
        console.log($scope.details[0]._id);
    });
}


mindanaoJobs.Controllers.controller('mainCtrl', ['$scope', '$location', 'UserFactory', 'Defaultfactory', mainCtrl]);
mindanaoJobs.Controllers.controller('aboutCtrl', ['$scope', aboutCtrl]);
mindanaoJobs.Controllers.controller('jobCtrl', ['$scope', '$location', '$filter', 'jobFactory', 'UserFactory', 'Defaultfactory', jobCtrl]);
mindanaoJobs.Controllers.controller('jobDetailsCtrl', ['$scope','$routeParams','jobFactory',jobDetailsCtrl]);
mindanaoJobs.Controllers.controller('modalController', ['$scope', '$modalInstance','UserFactory', modalController]);

