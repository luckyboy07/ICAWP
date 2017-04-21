(function() {
    'use strict';
    angular.module('ICCP')
        .controller('profileDetailCtrl', profileDetailCtrl);
    profileDetailCtrl.$inject = ['$scope', '$state', '$stateParams', 'APIFactory', 'localStorageService','ngTableParams'];

    function profileDetailCtrl($scope, $state, $stateParams, APIFactory, localStorageService,ngTableParams) {
        console.log('profileDetailCtrl');
        var currentUser = JSON.parse(localStorageService.get('appuser'));
        $scope.detail = {};
        $scope.jobhistories = [];
        $scope.userDetail = {};
        $scope.userdetailcopy = {};
        $scope.newpassword = '';
        console.log('loginuser:', currentUser);
        $scope.showupload = true;
        console.log('$stateParams:', $stateParams);
        if ($stateParams.id) {
            async.waterfall([
                function(callback) {
                    APIFactory.getDetailAlumni($stateParams.id).then(function(data) {
                        if (data.statusCode == 200 && data.response.success) {
                            $scope.detail = data.response.result;
                            console.log('$scope.detail:', $scope.detail);
                            callback();
                        }
                    });
                },
                function(callback) {
                    $scope.profTable = new ngTableParams({
                        page: 1,
                        count: 5
                    }, {
                        counts: [],
                        paginationMaxBlocks: 13,
                        paginationMinBlocks: 2,
                        getData: function($defer, params) {
                            $scope.job = [];
                            $scope.jobcopy = [];
                            APIFactory.getJobHistory($stateParams.id).then(function(data) {
                                if (data.statusCode == 200 && data.response.success) {
                                    $scope.job = data.response.result;
                                    $scope.jobcopy = angular.copy(data.response.result);
                                    console.log('$scope.job:',$scope.job);
                                    params.total($scope.job.length);
                                    var responsedata = $scope.job.slice((params.page() - 1) * params.count(), params.page() * params.count());
                                    $defer.resolve(responsedata);
                                };
                            });
                        }
                    });
                }
            ])

        }
    }

})();
