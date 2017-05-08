(function() {
    'use strict';
    angular.module('ICCPmain')
        .controller('EventCtrl', EventCtrl);
    EventCtrl.$inject = ['$scope', '$state', 'APIFactory', 'localStorageService', '$uibModal', 'toastr', 'ngDialog', '$filter'];

    function EventCtrl($scope, $state, APIFactory, localStorageService, $uibModal, toastr, ngDialog, $filter) {
        console.log('EventCtrl');
        $scope.events = [];

         var init = function() {
            APIFactory.getallPost().then(function(data) {
                if (data.statusCode == 200 && data.response.success) {
                    $scope.events = _.filter(data.response.result, { 'category': 'Event' });
                    $scope.events = _.uniqBy($scope.events);
                    console.log('$evnet:',$scope.events);
                }
            });
        }
        init();
    }

})();
