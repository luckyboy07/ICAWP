(function() {
    'use strict';
    angular.module('ICCPmain')
        .controller('NewsCtrl', NewsCtrl);
    NewsCtrl.$inject = ['$scope', '$state', 'APIFactory', 'localStorageService', '$uibModal', 'toastr', 'ngDialog', '$filter'];

    function NewsCtrl($scope, $state, APIFactory, localStorageService, $uibModal, toastr, ngDialog, $filter) {
        console.log('NewsCtrl');
         $scope.news = [];
        var init = function() {
            APIFactory.getallPost().then(function(data) {
                if (data.statusCode == 200 && data.response.success) {
                    $scope.news = _.filter(data.response.result, { 'category': 'News' });
                    $scope.news = _.uniqBy($scope.news);
                }
            });
        }
        init();
    }

})();
