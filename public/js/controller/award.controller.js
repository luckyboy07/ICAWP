(function() {
    'use strict';
    angular.module('ICCP')
        .controller('awardCtrl', awardCtrl);
    awardCtrl.$inject = ['$scope', '$state', 'APIFactory', 'localStorageService', '$uibModal', 'toastr', '$filter', 'ngTableParams'];

    function awardCtrl($scope, $state, APIFactory, localStorageService, $uibModal, toastr, $filter, ngTableParams) {

        console.log('awardCtrl')
        $scope.txtSearch = '';
        var init = function() {

            $scope.awardTable = new ngTableParams({
                page: 1,
                count: 5
            }, {
                counts: [5, 10, 50, 100],
                paginationMaxBlocks: 13,
                paginationMinBlocks: 2,
                getData: function($defer, params) {
                    $scope.awards = [];
                    $scope.awardscopy = [];
                    APIFactory.getAllaward().then(function(data) {
                        if (data.statusCode = 200 && data.response.success) {
                            $scope.awards = data.response.result;
                            $scope.awardscopy = angular.copy(data.response.result);

                            console.log('awards==>', $scope.awards);

                            if (_.isEmpty($scope.txtSearch)) {
                                $scope.awards = $scope.awardscopy;
                            } else if (!_.isEmpty($scope.txtSearch)) {
                                $scope.awards = $filter('filter')($scope.awardscopy, $scope.txtSearch);
                            }

                            params.total($scope.awards.length);
                            var responsedata = $scope.awards.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            $defer.resolve(responsedata);

                        }
                    });
                }
            });
        }


        $scope.addAward = function(id) {
            $scope.award = {};
            if (id) {
                APIFactory.getDetailAward(id).then(function(data) {
                    if (data.statusCode == 200 && data.response.success) {
                        $scope.award = data.response.result;
                    }
                })
            }
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                scope: $scope,
                size: 'sm',
                templateUrl: './public/templates/folder/award-modal.html'
            });
            $scope.cancel = function() {
                modalInstance.dismiss('cancel');
            }

            $scope.saveAward = function() {
                if (id) {
                    APIFactory.updateAward(id, $scope.award).then(function(data) {
                        if (data.statusCode = 200 && data.response.success) {
                            toastr.success(data.response.msg, 'Success');
                            $scope.refresh();
                            modalInstance.dismiss();
                        } else if (data.statusCode = 400 && !data.response.success) {
                            _.each(data.response.result, function(row) {
                                toastr.warning(row.msg, 'Warning');
                            });
                        }
                    });
                } else {
                    APIFactory.saveAward($scope.award).then(function(data) {
                        if (data.statusCode = 200 && data.response.success) {
                            toastr.success(data.response.msg, 'Success');
                            $scope.refresh();
                            modalInstance.dismiss();
                        } else if (data.statusCode = 400 && !data.response.success) {
                            _.each(data.response.result, function(row) {
                                toastr.warning(row.msg, 'Warning');
                            });
                        }
                    });
                }
            }

            modalInstance.result.then(function(selectedItem) {}, function() {
                console.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.searchData = function() {
            $scope.awardTable.reload();
        };

        $scope.refresh = function() {
            init();
        };

        $scope.refresh();
    }

})();
