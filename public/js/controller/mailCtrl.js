(function() {
    'use strict';
    angular.module('ICCP')
        .controller('mailCtrl', ['$scope', '$state', 'APIFactory', 'toastr', 'localStorageService', mailCtrl]);

    function mailCtrl($scope, $state, APIFactory, toastr, localStorageService) {
        $scope.alumnis = [];
        $scope.datas = {};
        var user = JSON.parse(localStorageService.get('appuser'));

        APIFactory.getAllAlumni().then(function(data) {
            if (data.statusCode = 200 && data.response.success) {
                $scope.alumnis = data.response.result;
            }
        });
        $scope.getalumni = function(value) {
            console.log('value:', value);
            if (value.description) {
                $scope.alumnu = value.originalObject.email_address;
            } else {
                $scope.alumnu = value.originalObject;
            }
        }
        $scope.send = function() {
            var object = {
                from: 'cocluck7@gmail.com',
                subject: $scope.datas.subject,
                email: $scope.alumnu,
                message: $scope.datas.body
            }
            APIFactory.sendEmail(object).then(function(data){
                console.log('data:',data);
                if(data.statusCode == 200 && data.response.success){
                    toastr.success(data.response.msg,'Success');
                    $state.go($state.current,null,{reload:true});
                }
            });
        };

    }

})();
