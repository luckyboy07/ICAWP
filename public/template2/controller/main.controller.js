(function() {
    'use strict';
    angular.module('ICCPmain')
        .controller('MainCtrl', MainCtrl);
    MainCtrl.$inject = ['$scope', '$state', 'APIFactory', 'localStorageService', '$uibModal', 'toastr', 'ngDialog', '$filter'];

    function MainCtrl($scope, $state, APIFactory, localStorageService, $uibModal, toastr, ngDialog, $filter) {
        console.log('MainCtrl');
        $scope.allpost = [];
        $scope.events = [];
        $scope.news = [];
        $scope.jobs = [];
        $scope.txtSearch = '';
        $scope.detail = {};
        var init = function() {
            APIFactory.getallPost().then(function(data) {
                if (data.statusCode == 200 && data.response.success) {
                    $scope.allpost = data.response.result;
                    $scope.events = _.filter(data.response.result, { 'category': 'Event' });
                    $scope.news = _.filter(data.response.result, { 'category': 'News' });
                    $scope.jobs = _.filter(data.response.result, { 'category': 'Job Hiring' });
                    console.log('$scope.events:', $scope.events);
                    // $scope.allpostcopy = angular.copy(data.response.result);
                    // console.log('data.response.result:', data);
                    console.log('$scope.allpost:', $scope.allpost);

                }
            });
        }
        init();
    }

})();
