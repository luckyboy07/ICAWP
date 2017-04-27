(function() {
    'use strict';
    angular.module('ICCP')
        .controller('accountCtrl', accountCtrl);
    accountCtrl.$inject = ['$scope', '$state', 'APIFactory', 'localStorageService', '$uibModal', 'toastr', 'ngDialog', '$filter'];

    function accountCtrl($scope, $state, APIFactory, localStorageService, $uibModal, toastr, ngDialog, $filter) {
        console.log('accountCtrl');
        $scope.accounts = [];
        $scope.accountscopy = [];
        $scope.txtSearch = '';
        $scope.detail = {};
        var init = function() {
            APIFactory.getuseraccounts().then(function(data) {
                if (data.statusCode == 200 && data.response.success) {
                    $scope.accounts = data.response.result;
                    $scope.accountscopy = angular.copy(data.response.result);
                    console.log('$scope.accounts:', $scope.accounts);
                }
            });
        }

        $scope.resetPassword = function(id) {
            ngDialog.openConfirm({
                templateUrl: './public/templates/folder/dialog.html',
                scope: $scope,
                className: 'ngdialog-theme-default'
            }).then(function() {
                APIFactory.userResetPass(id).then(function(data) {
                    if (data.statusCode == 200 && data.response.success) {
                        console.log('data:', data.response);
                        toastr.success(data.response.msg, 'Success');
                        popupmodal(data.response.result);
                    }
                })
            }, function(reason) {
                console.log('Modal promise close: ');
            });
        };
        var popupmodal = function(data) {
            $scope.detail = data;
            console.log('data:', data)
            var modalInstance = $uibModal.open({
                animation: false,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: './public/templates/folder/user-modal.html',
                size: 'sm',
                scope: $scope,
            });
            $scope.cancel = function() {
                modalInstance.dismiss('cancel');
                $scope.refresh();
                // $state.go($state.current, null, { reload: true });
            }
        }
        $scope.generateUser = function(student_id, id) {
            console.log('student_id:', student_id);
            console.log('id:', id);
            if (!_.isEmpty(student_id)) {
                APIFactory.generateAlumniAccount({
                    student_id: student_id,
                    account_id: id
                }).then(function(data) {
                    if (data.statusCode == 200 && data.response.success) {
                        toastr.success(data.response.msg, 'Success');
                        popupmodal(data.response.result);
                        // var parseint = parseInt(data.response.result)
                        // $state.go($state.current,null, { reload: true });
                    }
                });
            }else{
                toastr.error("Pease provide user's student id ",'Error');
            }
        };

        $scope.searchData = function() {
            console.log('asdasd')
            if (!_.isEmpty($scope.txtSearch)) {
                console.log('diri')
                $scope.accounts = $filter('filter')($scope.accountscopy, $scope.txtSearch);
            } else {
                $scope.accounts = $scope.accountscopy;
            }
        };

        $scope.refresh = function() {
            init();
        }
        $scope.refresh();
    }

})();
