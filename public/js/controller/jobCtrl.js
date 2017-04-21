var jobCtrl = function($scope, $location, $filter, jobFactory, UserFactory, Defaultfactory) {
    $scope.showmore = false;
    $scope.layout = 'detailed';
    $scope.job = {};
    $scope.filterdata = {};
    $scope.job.qualification = [{
        qualify: ''
    }];
    $scope.job.requirements = [{
        require: ''
    }];

    $scope.useMakes = [];

    $scope.basis = [{type: 'Full-time'},{type: 'Part-time'},{type: 'Contract'}];

    $scope.limit = 10;

    Defaultfactory.getAllJobLocation(function(data) {
        $scope.joblocation = data;
        $scope.newlocation = data;
    });

    Defaultfactory.getAllJobCategories(function(data) {
        $scope.jobcategories = data;
    });


    UserFactory.userProfile(function(data) {
        $scope.job.emp_id = data._id;
    });

    jobFactory.getJobs(function(data) {
        $scope.disJob = data;
    });

    $scope.job.datepost = new Date();

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

    $scope.showMore = function(){
        if($scope.disJob.length > $scope.limit){
            $scope.showmore = true;
             $scope.limit = $scope.limit + 10;
        }
    }

    $scope.searchCount= function(){
        $scope.showmore = false;
    }

   $scope.filterMakes = function () {
        return function (p) {
            if($scope.useMakes.length == 0){
                 return true;
            }
            for (var i in $scope.useMakes) {
                if($scope.useMakes[i] === false){
                    return true;
                }
                else if (p.categories == $scope.jobcategories[i].description) {
                    return true;
                }
                console.log($scope.useMakes[i]);
            }
        };
    };
}

var updateJobCtrl = function($scope,$routeParams,$location,jobFactory){

    jobFactory.showJobDetails($routeParams._id,function(data){
        $scope.job = data;
        console.log(data)
    })

    $scope.submitForm = function(valid) {
        console.log($scope.job);
        if (!valid) {
            alert('Fill up all fields');
        } else {
            jobFactory.UpdateJob($scope.job, function(data) {
                $location.path('/MyJobs');
            });
        }
    }
}

mindanaoJobs.Controllers.controller('jobCtrl', ['$scope', '$location', '$filter', 'jobFactory', 'UserFactory', 'Defaultfactory', jobCtrl]);
mindanaoJobs.Controllers.controller('updateJobCtrl', ['$scope','$routeParams','$location','jobFactory', updateJobCtrl]);
