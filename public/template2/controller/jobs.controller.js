(function() {
    'use strict';
    angular.module('ICCPmain')
        .controller('JobsCtrl', JobsCtrl);
    JobsCtrl.$inject = ['$scope', '$state', 'APIFactory', 'localStorageService', '$uibModal', 'toastr', 'ngDialog', '$filter'];

    function JobsCtrl($scope, $state, APIFactory, localStorageService, $uibModal, toastr, ngDialog, $filter) {
        console.log('JobsCtrl');
        $scope.jobs = [];
        var init = function() {
            APIFactory.getallPost().then(function(data) {
                if (data.statusCode == 200 && data.response.success) {
                    $scope.jobs = _.filter(data.response.result, { 'category': 'Job Hiring' });
                    $scope.jobs = _.uniqBy($scope.jobs);
                    console.log('$scope.jobs:', $scope.jobs);
                }
            });
        }
        init();
    }

})();
