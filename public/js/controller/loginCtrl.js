(function() {
    'use strict';
    angular.module('ICCP')
        .controller('loginCtrl', ['$scope', '$rootScope', '$state', 'APIFactory', 'toastr', 'localStorageService','$timeout', loginCtrl]);

    function loginCtrl($scope, $rootScope, $state, APIFactory, toastr, localStorageService,$timeout) {
        $scope.user = {};

        $scope.submitForm = function(valid) {
            console.log('login');
            APIFactory.login($scope.user).then(function(data) {
                console.log('data:',data);
                if (data.success) {
                    $rootScope.curr = data.result.user;
                    // localStorage.setItem('Person', 'user');
                    localStorageService.set('appuser', JSON.stringify(data.result.user));
                    $rootScope.loginuser = data.result.user;
                    toastr.success(data.msg, 'Success');
                    $timeout(function() {
                        if (data.result.user.person_type == 'Alumni') {
                            $state.go('main.post', null, { reload: true });
                        } else {
                            $state.go('main.alumni', null, { reload: true });
                        }
                    }, 2000)
                } else if (data.statusCode == 400 && !data.response.success) {
                    _.each(data.response.result, function(row) {
                        toastr.error(row.msg, 'Error');
                        setTimeout(function() {
                            $state.go('login');
                        }, 2000)
                    })
                } else {
                    toastr.error(data.msg, 'Error');
                    location = '';
                }
            });
        }
    }

})();
