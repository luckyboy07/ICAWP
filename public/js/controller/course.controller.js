(function() {
    'use strict';
    angular.module('ICCP')
        .controller('courseCtrl', courseCtrl);
    courseCtrl.$inject = ['$scope', '$state', 'APIFactory', 'localStorageService', '$uibModal', 'toastr', '$filter', 'ngTableParams'];

    function courseCtrl($scope, $state, APIFactory, localStorageService, $uibModal, toastr, $filter, ngTableParams) {
        console.log('courseCtrl');

        $scope.txtSearch = '';
        var init = function() {
            // APIFactory.getAllcourse().then(function(data) {
            //     if (data.statusCode == 200 && data.response.success) {
            //         $scope.courses = data.response.result;
            //         $scope.coursescopy = angular.copy(data.response.result);
            //         console.log('course==>', $scope.courses);
            //     }
            // });
            $scope.courseTable = new ngTableParams({
                page: 1,
                count: 5
            }, {
                counts: [5, 10, 50, 100],
                paginationMaxBlocks: 13,
                paginationMinBlocks: 2,
                getData: function($defer, params) {
                    $scope.courses = [];
                    $scope.coursescopy = [];
                    APIFactory.getAllcourse().then(function(data) {
                        if (data.statusCode = 200 && data.response.success) {
                            $scope.courses = data.response.result;
                            $scope.coursescopy = angular.copy(data.response.result);

                            if (_.isEmpty($scope.txtSearch)) {
                                $scope.courses = $scope.coursescopy;
                            } else if (!_.isEmpty($scope.txtSearch)) {
                                $scope.courses = $filter('filter')($scope.coursescopy, $scope.txtSearch);
                            }

                            params.total($scope.courses.length);
                            var responsedata = $scope.courses.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            $defer.resolve(responsedata);

                        }
                    });
                }
            });
        }

        $scope.addCourse = function() {
            $scope.detail = {};
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                scope: $scope,
                size: 'sm',
                templateUrl: './public/templates/folder/course-modal.html'
            });

            $scope.cancel = function() {
                modalInstance.dismiss('cancel');
            };

            $scope.save = function() {
                console.log('$scope.detail:', $scope.detail);
                if ($scope.detail) {
                    APIFactory.saveCourse($scope.detail).then(function(data) {
                        if (data.statusCode == 200 && data.response.success) {
                            toastr.success('Record successfully created', 'Success');
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
        $scope.getDetail = function(id) {
            $scope.detail = {};
            APIFactory.getDetailCourse(id).then(function(data) {
                if (data.statusCode == 200 && data.response.success) {
                    $scope.detail = data.response.result;
                    console.log('$scope.detail:', $scope.detail);
                }
            })
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                scope: $scope,
                templateUrl: './public/templates/folder/course-modal.html'
            });
            $scope.cancel = function() {
                modalInstance.dismiss('cancel');
            };
            $scope.save = function() {
                if ($scope.detail) {
                    console.log('$scope.detail:', $scope.detail)
                    APIFactory.updateCourse(id, $scope.detail).then(function(data) {
                        if (data.statusCode == 200 && data.response.success) {
                            toastr.success('Record successfully updated', 'Success');
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
        }
        $scope.searchData = function() {
            console.log('asdasd')
            $scope.courseTable.reload();
        };

        $scope.refresh = function() {
            init();
        }
        $scope.refresh();
    }

})();
