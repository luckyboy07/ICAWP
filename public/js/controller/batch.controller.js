(function() {
    'use strict';
    angular.module('ICCP')
        .controller('batchCtrl', batchCtrl);
    batchCtrl.$inject = ['$scope', '$state', 'APIFactory', 'localStorageService', '$uibModal', 'toastr', '$filter', 'ngTableParams'];

    function batchCtrl($scope, $state, APIFactory, localStorageService, $uibModal, toastr, $filter, ngTableParams) {
        console.log('batchCtrl');
        $scope.txtSearch = '';
        var init = function() {
            $scope.batchTable = new ngTableParams({
                page: 1,
                count: 5
            }, {
                counts: [5, 10, 50, 100],
                paginationMaxBlocks: 13,
                paginationMinBlocks: 2,
                getData: function($defer, params) {
                    $scope.batches = [];
                    $scope.batchescopy = [];
                    APIFactory.getAllBatch().then(function(data) {
                        if (data.statusCode = 200 && data.response.success) {
                            $scope.batches = data.response.result;
                            $scope.batchescopy = angular.copy(data.response.result);

                            if (_.isEmpty($scope.txtSearch)) {
                                $scope.batches = $scope.batchescopy;
                            } else if (!_.isEmpty($scope.txtSearch)) {
                                $scope.batches = $filter('filter')($scope.batchescopy, $scope.txtSearch);
                            }

                            params.total($scope.batches.length);
                            var responsedata = $scope.batches.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            $defer.resolve(responsedata);

                        }
                    });
                }
            });

        };

        $scope.addBatch = function(id) {
            $scope.obj = {};
            if (id) {
                APIFactory.getDetailBatch(id).then(function(data) {
                    if (data.statusCode == 200 && data.response.success) {
                        $scope.obj = data.response.result;
                        console.log('$scope.obj==>', $scope.obj);
                    }
                })
            }
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                scope: $scope,
                size: 'sm',
                templateUrl: './public/templates/folder/batch-modal.html'
            });

            $scope.cancel = function() {
                modalInstance.dismiss('cancel');
            }
            $scope.add = function() {
                if ($scope.obj) {
                    console.log('$scope.obj:',$scope.obj);
                    if (id) {
                        APIFactory.updateBatch(id, $scope.obj).then(function(data) {
                            if (data.statusCode == 200 && data.response.success) {
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
                        APIFactory.saveBatch($scope.obj).then(function(data) {
                            if (data.statusCode == 200 && data.response.success) {
                                toastr.success(data.response.msg, 'Success');
                                $scope.refresh();
                                modalInstance.dismiss();
                            }else if (data.statusCode = 400 && !data.response.success) {
                                _.each(data.response.result, function(row) {
                                    toastr.warning(row.msg, 'Warning');
                                });
                            }
                        });
                    }
                }
            }

            modalInstance.result.then(function(selectedItem) {}, function() {
                console.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.searchData = function() {
            $scope.batchTable.reload();
        };


        $scope.refresh = function() {
            init();
        };

        $scope.refresh();
    }

})();
