'use strict';

var employerCtrl = function($scope,$location,$upload,notify,Employerfactory,UserFactory,Defaultfactory,jobFactory){
    $scope.employer = {};
    $scope.displayEmployer = {};
    $scope.displayEmployer.contacts = [{NumberType: '',number: ''}];
    $scope.employeracc = {};
    $scope.user = {};
    $scope.showmore = false;
    $scope.employer.contacts = [{NumberType: '',number: ''}];
    $scope.employer.Jobs = [];
    $scope.disJob = {};

    $scope.limit = 10;

    UserFactory.userProfile(function(data){
        $scope.displayEmployer = data;
        console.log($scope.displayEmployer);

        jobFactory.getJobsEmpBase($scope.displayEmployer,function(data){
            $scope.disJob = data;
        })
    });

    Defaultfactory.getAllJobLocation(function(data){
        $scope.empaddress = data;
    });

    $scope.change=function(item){
        $scope.address = item;
        $scope.employer.address = $scope.address.town_cities_name;
    }

    $scope.addContact = function(){
        $scope.employer.contacts.push({NumberType: "",number: ""});
    }

    $scope.addContact1 = function(){
        $scope.displayEmployer.contacts.push({NumberType: "",number: ""});
    }

    $scope.deleteContact = function(index){
        if($scope.employer.contacts.length > 1){
            $scope.employer.contacts.splice(index,1);
        }
    }

    $scope.deleteContact1= function(index){
        if($scope.displayEmployer.contacts.length > 1){
            $scope.displayEmployer.contacts.splice(index,1);
        }
    }

    var file;
     $scope.onFileSelect = function($files) {
        file = $files;
        console.log(file);
     }

    $scope.getEmployerData = function(valid){

        console.log('sulod dre');
        if(valid){
            alert('Fill up all fields');
        }else{
            Employerfactory.saveEmployerdata($scope.employer, function(data){
                console.log(data);
                $scope.user.username = data.email;
                $scope.user.password = data.password;
                console.log($scope.user);
                UserFactory.EmpuserLogin($scope.user,function(data){
                    localStorage.setItem('Person', 'employer');
                    $location.url('/homepage');
                     window.location.reload();
                });
            });
        }
    }

    $scope.update = function(){

        $scope.displayEmployer.image = $scope.displayEmployer._id;
        console.log($scope.displayEmployer);

        $scope.upload = $upload.upload({
                url: '/employerDisplay/'+ $scope.displayEmployer._id,
                data: $scope.displayEmployer,
                method: 'PUT',
                file: file,
            }).success(function(data, status, headers, config) {
                console.log($scope.displayEmployer);
                notify({message:'Successfully Updated',classes:'notify-alert'});
                $scope.user.username = $scope.displayEmployer.email;
                $scope.user.password = $scope.displayEmployer.password;
                UserFactory.EmpuserLogin($scope.user,function(data){
                    $scope.displayEmployer =data;
                });
            });
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
}

var companyprofileCtrl = function($scope,$routeParams,jobFactory){
    jobFactory.companyProfile($routeParams._id,function(data){
        $scope.companyProfile = data;
    })
}

mindanaoJobs.Controllers.controller('employerCtrl', ['$scope', '$location','$upload', 'notify' ,'Employerfactory', 'UserFactory', 'Defaultfactory', 'jobFactory', employerCtrl]);
mindanaoJobs.Controllers.controller('companyprofileCtrl', ['$scope','$routeParams','jobFactory', companyprofileCtrl]);
