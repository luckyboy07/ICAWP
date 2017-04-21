(function() {
    'use strict';
    angular.module('ICCP')
        .controller('MainCtrl', MainCtrl);
    MainCtrl.$inject = ['$scope', '$state', 'APIFactory', 'localStorageService'];

    function MainCtrl($scope, $state, APIFactory, localStorageService) {
        console.log('MainCtrl');
        $scope.currentUser = JSON.parse(localStorageService.get('appuser'));
        $scope.user = {};
        if ($scope.currentUser.person_type == 'Alumni') {
            APIFactory.getDetailAlumni($scope.currentUser.account_id).then(function(data) {
                if (data.statusCode == 200 && data.response.success) {
                    $scope.user = data.response.result;
                }
            });

        } else {
            $scope.user.firstname = 'Admin';
        }
        $scope.dataSelected = function(selected) {
            console.log('selected:', selected);
            if(selected){
            $state.go('main.profiledetail', { id: selected.originalObject.alumni_id }, { reload: true });

            }
        };

        $scope.sample = function(item) {
            $state.go('main.search', { value: item }, { reload: true });

            // document.activeElement.blur();

        };

        $scope.inputProductChanged = function(re) {
            $scope.searchinput = re;
        };

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $scope.alumni = [];
            console.log('toState;',toState);
             APIFactory.getAllAlumni().then(function(data) {
                    $scope.alumni = _.filter(data.response.result, function(row) {
                        return row.alumni_id !== $scope.currentUser.account_id;
                    });
                })
        });

    }

})();
