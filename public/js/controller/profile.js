(function() {
    'use strict';
    angular.module('ICCP')
        .controller('profileCtrl', profileCtrl);
    profileCtrl.$inject = ['$scope', '$state', '$stateParams', 'APIFactory', 'localStorageService', '$uibModal', 'toastr', '$timeout', 'Upload', 'API_URL', 'API_VERSION', 'ngTableParams', '$filter'];

    function profileCtrl($scope, $state, $stateParams, APIFactory, localStorageService, $uibModal, toastr, $timeout, Upload, API_URL, API_VERSION, ngTableParams, $filter) {
        console.log('profileCtrl');
        var currentUser = JSON.parse(localStorageService.get('appuser'));
        $scope.detail = {};
        $scope.jobhistories = [];
        $scope.userDetail = {};
        $scope.userdetailcopy = {};
        $scope.newpassword = '';
        $scope.showupload = true;
        $scope.sample = function() {
        }
        var get = function() {
            $scope.profTable = new ngTableParams({
                page: 1,
                count: 5
            }, {
                counts: [],
                paginationMaxBlocks: 13,
                paginationMinBlocks: 2,
                getData: function($defer, params) {
                    $scope.job = [];
                    $scope.approvedpost = [];
                    $scope.jobcopy = [];
                    APIFactory.getJobHistory($stateParams.id).then(function(data) {
                        if (data.statusCode == 200 && data.response.success) {
                            $scope.job = data.response.result;
                            $scope.jobcopy = angular.copy(data.response.result);
                            console.log('job:',$scope.job)
                            if (!_.isEmpty($scope.txtSearch) && $scope.filtervalue == 'All') {
                                console.log('1');
                                $scope.job = $filter('filter')(data.response.result, $scope.txtSearch);
                            } else if (!_.isEmpty($scope.txtSearch) && $scope.filtervalue !== 'All') {
                                console.log('2');
                                $scope.job = $filter('filter')(data.response.result, { 'category': $scope.filtervalue });
                                $scope.job = $filter('filter')($scope.job, $scope.txtSearch);
                            } else if (_.isEmpty($scope.txtSearch) && $scope.filtervalue !== 'All') {
                                console.log('3');
                                $scope.job = $filter('filter')(data.response.result, { 'category': $scope.filtervalue });
                            } else if (_.isEmpty($scope.txtSearch) && $scope.filtervalue == 'All') {
                                console.log('4');
                                $scope.job = data.response.result;
                            }

                            params.total($scope.job.length);
                            var responsedata = $scope.job.slice((params.page() - 1) * params.count(), params.page() * params.count());
                            $defer.resolve(responsedata);
                        };
                    });
                }
            });
        };
        
        if (currentUser.person_type == 'Alumni' && $stateParams.id) {
            async.waterfall([
                function(callback) {
                    get();
                    callback();
                },
                function(callback) {
                    APIFactory.getDetailAlumni($stateParams.id).then(function(data) {
                        if (data.statusCode == 200 && data.response.success) {
                            $scope.detail = data.response.result;
                            $scope.jobhistories = $scope.detail.job_history;
                            // console.log(' data.response.result:', data.response.result);
                            // console.log('$scope.detail:', $scope.detail);
                            callback(null);
                        }
                    });
                },
                function(callback) {
                    APIFactory.getUserDetail($stateParams.id).then(function(data) {
                        if (data.statusCode == 200 && data.response.success) {
                            $scope.userDetail = data.response.result;
                            $scope.userdetailcopy = angular.copy(data.response.result);
                            callback();
                        }
                    });
                }
            ])


        }

        $scope.removethumb = function() {
            $scope.showupload = true;
            $scope.detail.image_path = null;
            $scope.newImage = false;
        };

        $scope.upload = function(file) {
            $scope.detail.image_path = file;
            $scope.showupload = false;
            $scope.newImage = true;
        };
        $scope.uploaduserprofile = function() {
            if ($scope.newImage && $scope.detail.image_path) {
                Upload.upload({
                    url: API_URL + API_VERSION + 'alumni/' + currentUser.uc_id + '/upload-image',
                    data: { image_path: $scope.detail.image_path },
                    method: 'PUT',
                }).then(function(resp) {
                    if (resp.data.statusCode === 200 && resp.data.response.success) {
                        toastr.success('Image successfully uploaded', 'Success');
                        $state.go($state.current, null, { reload: true });
                    } else if (resp.data.statusCode === 400 && !resp.data.response.success && _.isArray(resp.data.response.result)) {
                        _.each(resp.data.response.result, function(msg) {
                            toastr.warning(msg.msg, 'Warning');
                        });
                    } else {
                        console.log('Error');
                        toastr.error(resp.data.response.msg, 'Error');
                        return;
                    }
                }, function(resp) {
                    console.log('Error status: ' + resp.status);
                }, function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                });
            } else {
                toastr.success('Record successfully updated', 'Success');
                $state.go($state.current, { id: alumni_id }, { reload: true });
            }
        };

        $scope.jobModal = function(selecteditem) {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: './public/templates/job.modal.html',
                controller: 'jobCtrl',
                size: 'lg',
                resolve: {
                    item: function() {
                        return selecteditem;
                    },
                    history: function() {
                        return $scope.jobhistories;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {}, function() {});
        }
        $scope.changeEmail = function(email) {
            console.log('email:', email);
        };

        $scope.editProfile = function() {
            APIFactory.updateAlumni($scope.detail.alumni_id, $scope.detail).then(function(data) {
                if (data.statusCode == 200 && data.response.success) {
                    toastr.success('Record successfully updated', 'Success');
                    // $state.go($state.current, null, { reload: true });
                }
            })
        };

        $scope.updateUsername = function() {
            if ($scope.userDetail.username.toLowerCase() == $scope.userdetailcopy.username.toLowerCase()) {
                toastr.error("Can't update same username", 'Error');
            } else {
                APIFactory.updateUserAccount($scope.userDetail.uc_id, $scope.userDetail).then(function(data) {
                    if (data.statusCode == 200 && data.response.success) {
                        toastr.success('Username successfully updated', 'Success');
                        $state.go($state.current, null, { reload: true });
                    }
                });
            }
        };

        $scope.updatePassword = function(newpass) {
            if (newpass.length > 5) {
                $scope.oldpassword = '';
                if (newpass == $scope.userDetail.password) {
                    toastr.error('New password must not the same from old password', 'Error');
                } else {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        backdrop: 'static',
                        templateUrl: './public/templates//folder/confirm-modal.html',
                        size: 'md',
                        scope: $scope
                    });
                    $scope.cancel = function() {
                        modalInstance.dismiss('');
                    };
                    $scope.confirm = function(oldpassword) {
                        if ($scope.userDetail.password == oldpassword) {
                            APIFactory.updateUserAccount($scope.userDetail.uc_id, {
                                username: $scope.userDetail.username,
                                person_type: $scope.userDetail.person_type,
                                password: newpass
                            }).then(function(data) {
                                if (data.statusCode == 200 && data.response.success) {
                                    toastr.success('Password successfully updated', 'Success');
                                    $timeout(function() {
                                        $state.go($state.current, null, { reload: true });
                                    }, 500)
                                }
                            });
                        } else {
                            toastr.error('Password incorrect', 'Error');

                        }
                    };

                    modalInstance.result.then(function(selectedItem) {}, function() {});
                }
            } else {
                toastr.error('New password must contain at least 6 characters');
            }

        };
    }

})();
