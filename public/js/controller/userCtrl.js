var userCtrl = function($scope, $timeout, $upload, $modal, $location, UserFactory, Defaultfactory) {

    $scope.UserProfile = {};
    $scope.UserEduc = {};
    $scope.UserSkills = {};

    $scope.UserTraining = {};
    $scope.UserWork = {};

    $scope.dt = new Date();

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.proficiency = [{
        description: 'Advanced',
        value: 'advanced'
    }, {
        description: 'Intermediate',
        value: 'intermediate'
    }, {
        description: 'Beginner',
        value: 'beginner'
    }];

    $scope.UserProfile.contacts = [{
        number: '',
        type: ''
    }];

    $scope.UserSkills.skills = [{
        skill_name: '',
        proficiency: ''
    }];

    $scope.UserTraining.training = [{
        name: '',
        date: '',
        trainor: ''
    }];

    $scope.UserWork.workExperienced = [{
        companyName: '',
        salary: '',
        duration: '',
        responsibility: '',
        location: '',
        description: ''
    }];


    $scope.refreshUser = function() {
        UserFactory.userProfile(function(data) {
            console.log('refresh account', data._id);
            if (data._id) {
                UserFactory.CurrentUser(data._id, function(user) {
                    $scope.UserEduc._id = user._id;
                    $scope.UserSkills._id = user._id;
                    $scope.UserTraining._id = user._id;
                    $scope.UserWork._id = user._id;

                    $scope.UserProfile = user;
                    $scope.UserProfile.contacts = user.contacts;

                    $scope.UserEduc.education = user.education;
                    $scope.UserSkills.skills = user.skills;
                    $scope.UserTraining.training = user.training;
                    $scope.UserWork.workExperienced = user.workExperienced;
                });
            } else {
                $location.url('/');
            }
        });
    }



    $scope.onFileSelect = function($files) {
        console.log($files);
        for (var i = 0; i < $files.length; i++) {
            var photo = $files[i];
            console.log('file upload: ', file);
            $scope.upload = $upload.upload({
                url: '/api/uploadresume',
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: {
                    myObj: $scope.myModelObj
                },
                file: photo
            }).progress(function(evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function(data, status, headers, config) {
                // file is uploaded successfully
                console.log('file is uploaded successfully: ', data);
            });
        }
    };

    Defaultfactory.getAllJobLocation2(function(data) {
        $scope.joblocation2 = data;
    });

    Defaultfactory.getAllJobCategories(function(data) {
        $scope.jobcategories = data;
    });

    $scope.address = {};
    $scope.refreshSkills = function(skills) {
        var params = {
            skills_name: skills
        };
        Defaultfactory.findSkills(params, function(data) {
            $scope.allSkills = data[0];
            console.log('allSkills: ', data[0]);
        });
    };

    $scope.open = function() {
        $timeout(function() {
            $scope.opened = true;
        });
    };

    $scope.openSpecialization = function(size) {
        var pop = $modal.open({
            templateUrl: 'editCategories.html',
            controller: 'modalController',
            size: 'lg'
        });
    };

    $scope.addContact = function() {
        $scope.UserProfile.contacts.push({
            number: '',
            type: ''
        });
    }
    $scope.deleteContact = function(index) {
        if ($scope.UserProfile.contacts.length > 1) {
            $scope.UserProfile.contacts.splice(index, 1);
        }
    }



    $scope.addWorkExperienced = function() {
        $scope.UserWork.workExperienced.push({
            companyName: '',
            salary: '',
            duration: '',
            responsibility: '',
            location: '',
            description: ''
        });
    }
    $scope.deleteWorkExperienced = function(index) {
        if ($scope.UserWork.workExperienced.length > 1) {
            $scope.UserWork.workExperienced.splice(index, 1);
        }
    }



    $scope.addSkills = function() {
        $scope.UserSkills.skills.push({
            skill_name: '',
            proficiency: ''
        });
    }
    $scope.deleteSkills = function(index) {
        if ($scope.UserSkills.skills.length > 1) {
            $scope.UserSkills.skills.splice(index, 1);
        }
    }



    $scope.addTraining = function() {
        $scope.UserTraining.training.push({
            name: '',
            date: '',
            trainor: ''
        });
    }
    $scope.deleteTraning = function(index) {
        if ($scope.UserTraining.training.length > 1) {
            $scope.UserTraining.training.splice(index, 1);
        }
    }





    $scope.saveUserPersonalInfo = function() {

        if (true === $('#accountdetails').parsley().validate('block-account'))

            $scope.UserProfile.location = $('#location').val();
        $scope.UserProfile.city = $('#city').val();

        console.log('saveUserPersonalInfo', $scope.UserProfile);

        UserFactory.updateUserData($scope.UserProfile, function(data) {
            console.log('update User Personal Information', data);
        });
    }

    $scope.saveUserPassword = function() {

        if (true === $('#passwordchange').parsley().validate('block-account'))

            $scope.UserProfile.password = $('#verifyPasswordInput').val();

        console.log('saveUserPassword', $scope.UserProfile);

        UserFactory.updateUserData($scope.UserProfile, function(data) {
            console.log('update User Password', data);
            window.location.reload();
        });
    }

    $scope.saveUserOverview = function() {
        $('#overlay').fadeIn(800);

        $(".main-container").prepend('');
        if (true === $('#userForm').parsley().validate('block-account')) {
            console.log('saveUserOverview', $scope.UserProfile);

            UserFactory.updateUserData($scope.UserProfile, function(data) {
                console.log('update User Personal Information', data);

                $(".main-container").prepend('<div class="container verification-text save-changes-header">\
                    Your changes have been saved \
                </div>');

                $(window).scrollTop(0);

                $scope.refreshUser();

                $('#overlay').fadeOut(800);
            });
        } else {
            $('#overlay').fadeOut(800);
        }
    }

    $scope.saveUserEducation = function() {
        $('#overlay').fadeIn(800);

        $(".main-container").prepend('');

        if (true === $('#educForm').parsley().validate('block-account')) {
            UserFactory.updateUserData($scope.UserEduc, function(data) {
                console.log('update USer Education', data);

                $(".main-container").prepend('<div class="container verification-text save-changes-header">\
                    Your changes have been saved \
                </div>');

                $(window).scrollTop(0);

                $scope.refreshUser();

                $('#overlay').fadeOut(800);
            });
        } else {
            $('#overlay').fadeOut(800);
        }
    }

    $scope.saveUserSkills = function() {
        $scope.showErrorsCheckValidity = true;

        if ($scope.UserSkills) {
            console.log('saveUserSkills', $scope.UserSkills);

            UserFactory.updateUserData($scope.UserSkills, function(data) {
                console.log('update USer Skills', data);
            });
        }
    }

    $scope.saveUserTraining = function() {
        console.log('saveUserTraining');

        $scope.showErrorsCheckValidity = true;

        if ($scope.UserTraining) {
            console.log('saveUserTraining', $scope.UserTraining);

            UserFactory.updateUserData($scope.UserTraining, function(data) {
                console.log('update USer Skills', data);
            });
        }
    }

    $scope.saveUserWork = function() {
        // $('#overlay').fadeIn(800);

        $(".main-container").prepend('');

        if (true === $('#proForm').parsley().validate('block-account')) {
            /*UserFactory.updateUserData($scope.UserWork, function(data) {
                console.log('update USer Skills', data);

                $(".main-container").prepend('<div class="container verification-text save-changes-header">\
                    Your changes have been saved \
                </div>');

                $(window).scrollTop(0);

                $scope.refreshUser();

                $('#overlay').fadeOut(800);
            });*/
        } else {
            $('#overlay').fadeOut(800);
        }
    }




    $scope.refreshUser();

}

mindanaoJobs.Controllers.controller('userCtrl', ['$scope', '$timeout', '$upload', '$modal', '$location', 'UserFactory', 'Defaultfactory', userCtrl]);
