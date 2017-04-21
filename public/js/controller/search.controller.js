(function() {
    'use strict';
    angular.module('ICCP')
        .controller('searchCtrl', searchCtrl);
    searchCtrl.$inject = ['$scope', '$state', '$stateParams', 'APIFactory', 'localStorageService', '$uibModal', 'toastr', '$filter', 'ngTableParams'];

    function searchCtrl($scope, $state, $stateParams, APIFactory, localStorageService, $uibModal, toastr, $filter, ngTableParams) {
        console.log('searchCtrl');
        $scope.txtSearch = '';
        console.log('$stateParams:', $stateParams);
        var user = JSON.parse(localStorageService.get('appuser'));
        $scope.searchresults = [];
        if ($stateParams.value) {
            APIFactory.getAllAlumni().then(function(data) {
                if (data.statusCode == 200 && data.response.success) {
                   console.log('user:',user);
                   var filter = _.filter(data.response.result,function(row){
                        return row.alumni_id !== user.account_id;
                   })
                   console.log('filter:',filter);
                    // $scope.searchresults = $filter('filter')(filter,$stateParams.value);
                    $scope.searchresults = _.filter(filter,function(row){
                        return row.firstname.toLowerCase().startsWith($stateParams.value.toLowerCase()) || row.lastname.toLowerCase().startsWith($stateParams.value.toLowerCase());
                    })
                    console.log('$scope.searchresults:',$scope.searchresults);
                }
            })

        }
        $scope.getalumni = function(value){
            console.log('value:',value);
        }
    }

})();
