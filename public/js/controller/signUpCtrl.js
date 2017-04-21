var signUpCtrl = function($scope, $location, $rootScope, UserFactory) {
    console.log('message');
    $scope.User = {};
    $scope.login = {};


    $scope.signUpUser = function() {
        console.log('signUpUser');

        if (true === $('#registerform').parsley().validate('block1')) {
            $scope.User.confirm = false;

            console.log('message signUpUser');
             UserFactory.signUpUser($scope.User, function(data) {
                $scope.login.username = data.email;
                $scope.login.password = data.password;

                user_login();
            });
        }

        // blureffect('#FirstName');
        // blureffect('#LastName');
        // blureffect('#email');
        // blureffect('#password');
        // blureffect('#confirmpassword');

        // if ($scope.regForm.$valid) {
        //     $scope.User.confirm = false;

        //     UserFactory.signUpUser($scope.User, function(data) {
        //         $scope.login.username = data.email;
        //         $scope.login.password = data.password;

        //         user_login();
        //     });
        // }
    };

    $scope.facebook = function() {
        UserFactory.regFacebook(function(data) {
            console.log('facebook: ', data);
        });
    }

    $scope.twitter = function() {
        UserFactory.regFacebook(function(data) {
            console.log('facebook: ', data);
        });
    }

    $scope.googleplus = function() {
        UserFactory.regGooglePlus(function(data) {
            console.log('facebook: ', data);
        });
    }

    $scope.employee = function() {
        $location.url('/join');
    };

    $scope.employer = function() {
        $location.url('/EmployerForm');
    };

    function user_login() {
        UserFactory.userLogin($scope.login, function(data) {
            $rootScope.message = 'Authentication successful!';
            $location.url('/homepage');
        });
    }

};

var recoverCtrl = function($scope, $location, $rootScope, UserFactory) {

    $scope.recover_password = function() {
        console.log('recover_password');
        $scope.showErrorsCheckValidity = true;

        if ($scope.regForm.$valid) {
            console.log('recover passwordsss:');

            UserFactory.recoverPassword($scope.User, function(data) {
                $scope.login.username = data.email;
                $scope.login.password = data.password;

                user_login();
            });
        }
    }
}

mindanaoJobs.Controllers.controller('signUpCtrl', ['$scope', '$location', '$rootScope', 'UserFactory', signUpCtrl]);
mindanaoJobs.Controllers.controller('recoverCtrl', ['$scope', '$location', '$rootScope', 'UserFactory', recoverCtrl]);
