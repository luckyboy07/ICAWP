(function() {
    'use strict';
    angular.module('ICCP')
        .controller('alumniDetailCtrl', alumniDetailCtrl)
        .controller('jobCtrl', jobCtrl);
    alumniDetailCtrl.$inject = ['$scope', 'APIFactory', '$stateParams', 'Upload', 'API_URL', 'API_VERSION', '$state', 'toastr', '$uibModal']
    jobCtrl.$inject = ['$scope', 'APIFactory', '$stateParams', '$state', 'toastr', '$uibModalInstance', 'item', 'history', 'localStorageService'];

    function alumniDetailCtrl($scope, APIFactory, $stateParams, Upload, API_URL, API_VERSION, $state, toastr, $uibModal) {
        console.log('alumniDetailCtrl')
        $scope.detail = {};
        $scope.detail.job_history = {};
        $scope.courses = [];
        $scope.batches = [];
        $scope.batchcopy = [];
        APIFactory.getAllcourse().then(function(data) {
            if (data.statusCode == 200 && data.response.success) {
                $scope.courses = data.response.result;
            }
        });

        if ($stateParams.id) {
            $scope.displays = false;
            APIFactory.getDetailAlumni($stateParams.id).then(function(data) {
                if (data.statusCode == 200 && data.response.success) {
                    $scope.detail = data.response.result;
                    $scope.sample = angular.copy(data.response.result);
                    console.log('$scope.detail:', $scope.detail);
                    console.log('$scope.sample:', $scope.sample);
                    $scope.jobhistories = data.response.result.job_history;
                }
            });

        }
        APIFactory.getAllBatch().then(function(data) {
            if (data.statusCode == 200 && data.response.success) {
                $scope.batches = data.response.result;
                $scope.batchcopy = angular.copy(data.response.result);
                console.log('$scope.batches:', $scope.batches)
            }
        })
        if (_.isEmpty($scope.detail.job_history)) {
            $scope.detail.job_history.status = 'Current';
        }
        $scope.getBatch = function(value) {
            $scope.detail.year_graduate = value;
            var val = _.find($scope.batchcopy, { 'year_graduated': value });
            $scope.detail.batch_name = val.name;
        };

        $scope.addAlumni = function() {
            async.waterfall([
                function(callback) {
                    if ($stateParams.id) {
                        APIFactory.updateAlumni($stateParams.id, $scope.detail).then(function(data) {
                            if (data.statusCode == 200 && data.response.success) {
                                callback(null, data.response.result);
                            } else if (data.statusCode == 400 && !data.response.success) {
                                console.log('data.response:', data.response);
                                _.each(data.response.result, function(er) {
                                    toastr.warning(er.msg, 'Warning!');
                                });
                            }
                        });
                    } else {
                        $scope.detail.Uaccount_status = 0;
                        APIFactory.saveAlumni($scope.detail).then(function(data) {
                            if (data.statusCode == 200 && data.response.result) {
                                callback(null, data.response.result)
                            } else if (data.statusCode == 400 && !data.response.success) {
                                console.log('data.response:', data.response);
                                _.each(data.response.result, function(er) {
                                    toastr.warning(er.msg, 'Warning!');
                                });
                            }
                        });
                    }
                },
                function(alumni_id, callback) {
                    console.log('$scope.detail.image_path:', $scope.detail.image_path);
                    if ($scope.newImage && $scope.detail.image_path) {
                        Upload.upload({
                            url: API_URL + API_VERSION + 'alumni/' + alumni_id + '/upload-image',
                            data: { image_path: $scope.detail.image_path },
                            method: 'PUT',
                        }).then(function(resp) {
                            if (resp.data.statusCode === 200 && resp.data.response.success) {
                                toastr.success('Image successfully uploaded', 'Success');
                                $state.go($state.current, { alumni_id: alumni_id }, { reload: true });
                            } else if (resp.data.statusCode === 400 && !resp.data.response.success && _.isArray(resp.data.response.result)) {
                                _.each(resp.data.response.result, function(msg) {
                                    toastr.warning(msg.msg, 'Warning');
                                    console.log('WARNING');
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
                }
            ]);
        };

        $scope.generateUser = function() {
            APIFactory.generateAlumniAccount({
                account_id: $stateParams.id
            }).then(function(data) {
                if (data.statusCode == 200 && data.response.success) {
                    toastr.success(data.response.msg, 'Success');
                    var parseint = parseInt(data.response.result)
                    $state.go($state.current, { id: parseint }, { reload: true });
                }
            });
        };
        $scope.upload = function(file) {
            console.log('file:', file);
            if (!_.isEmpty(file)) {

            } else {
                console.log('diri')
                $scope.image_new = $scope.sample.image_path;
            }
            $scope.newImage = true;
        };
        $scope.addModal = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: './public/templates/job.modal.html',
                controller: 'jobCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function(selectedItem) {}, function() {});
        };

        $scope.jobModal = function(selecteditem) {
            console.log('selecteditem', selecteditem);
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
    };

    function jobCtrl($scope, APIFactory, $stateParams, $state, toastr, $uibModalInstance, item, history, localStorageService) {
        console.log('jobCtrl');
        $scope.currentUser = JSON.parse(localStorageService.get('appuser'));
        $scope.courses = [];
        $scope.enabledisplay = false;
        $scope.job_related = [{
            status: 'Yes'
        }, {
            status: 'No',
        }]
        var related;
        console.log('item:', item);
        APIFactory.getAllcourse().then(function(data) {
            if (data.statusCode == 200 && data.response.success) {
                $scope.courses = data.response.result;
            }
        });
        $scope.selected = item;
        if (!_.isUndefined(item)) {
            if ($scope.selected.current == 1) {
                $scope.selected.current = true;
            }

            if ($scope.selected.job_related == 1) {
                _.map($scope.job_related, function(row) {
                    if (row.status == 'Yes') {
                        row.checked = true;
                    }
                })
            } else {
                _.map($scope.job_related, function(row) {
                    if (row.status == 'No') {
                        row.checked = true;
                    }
                })
            }
        }

        $scope.job = {};
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.itemcheck = function(item) {
            _.each($scope.job_related, function(row) {
                if (row.status !== item.status) {
                    row.checked = false;
                }
            });
            console.log('$scope.job_related:', $scope.job_related);
        }

        // $scope.checkcurrent = function() {
        //     console.log('selected.current:', $scope.selected.current);
        //     if ($scope.selected.current) {
        //         $scope.enabledisplay = true;
        //     } else {
        //         $scope.enabledisplay = false;
        //     }
        // }

        $scope.update = function() {
            console.log('$scope.job_related:', $scope.job_related);
            console.log('$scope.selected:', $scope.selected);
            console.log('item:', item);
            if ($scope.job_related) {
                var relate = _.find($scope.job_related, { 'checked': true });
                console.log('relate:', relate);
                if (!_.isUndefined(relate) && relate.status == 'Yes') {
                    $scope.selected.job_related = 1;
                } else if (!_.isUndefined(relate) && relate.status == 'No') {
                    $scope.selected.job_related = 0;
                }
            }
            if ($scope.selected.current) {
                $scope.selected.current = 1;
                $scope.selected.date_to = null;
            } else {
                $scope.selected.current = 0;
            }
            if (item && item.company_id) {
                APIFactory.updateHistory(item.company_id, $scope.selected).then(function(data) {
                    if (data.statusCode == 200 && data.response.success) {
                        toastr.success(data.response.msg, 'Success')
                        $state.go($state.current, null, { reload: true });
                        $uibModalInstance.dismiss('cancel');
                    }
                });
            } else {
                var user_id = $stateParams.id || $scope.currentUser.account_id;
                APIFactory.createHistory(user_id, $scope.selected).then(function(data) {
                    console.log('data:', data);
                    if (data.statusCode == 200 && data.response.result) {
                        toastr.success(data.response.msg, 'Success')
                        $state.go($state.current, null, { reload: true });
                        $uibModalInstance.dismiss('cancel');
                    } else if (data.statusCode == 400 && !data.response.success) {
                        _.each(data.response.result, function(row) {
                            toastr.warning(row.msg, 'Warning!');
                        });
                    }
                });
            }
            console.log('item:', item);
            // if (item && item.company_id) {
            //     if ($scope.selected.current) {
            //         var result = _.filter(history, function(row) {
            //             return row.company_id !== $scope.selected.company_id;
            //         });
            //         var currentwork = _.find(result, { 'current': true }) || _.find(result, { 'current': 1 });
            //         if (currentwork) {
            //             async.waterfall([
            //                 function(callback) {
            //                     currentwork.current = 0;
            //                     APIFactory.updateHistory(currentwork.company_id, currentwork).then(function(data) {
            //                         if (data.statusCode == 200 && data.response.success) {
            //                             callback();
            //                             // toastr.success(data.response.msg, 'Success')
            //                             // $state.go($state.current, null, { reload: true });
            //                             // $uibModalInstance.dismiss('cancel');
            //                         }
            //                     });
            //                 },
            //                 function(callback) {
            //                     APIFactory.updateHistory(item.company_id, $scope.selected).then(function(data) {
            //                         if (data.statusCode == 200 && data.response.success) {
            //                             toastr.success(data.response.msg, 'Success')
            //                             $state.go($state.current, null, { reload: true });
            //                             $uibModalInstance.dismiss('cancel');
            //                         }
            //                     });
            //                 }
            //             ])
            //         } else {
            //             APIFactory.updateHistory(item.company_id, $scope.selected).then(function(data) {
            //                 if (data.statusCode == 200 && data.response.success) {
            //                     toastr.success(data.response.msg, 'Success')
            //                     $state.go($state.current, null, { reload: true });
            //                     $uibModalInstance.dismiss('cancel');
            //                 }
            //             });
            //         }
            //     } else {
            //         APIFactory.updateHistory(item.company_id, $scope.selected).then(function(data) {
            //             if (data.statusCode == 200 && data.response.success) {
            //                 toastr.success(data.response.msg, 'Success')
            //                 $state.go($state.current, null, { reload: true });
            //                 $uibModalInstance.dismiss('cancel');
            //             }
            //         });
            //     }

            // } else {
            //     console.log('1');
            //     var user_id = $stateParams.id || $scope.currentUser.account_id;
            //     if ($scope.selected.current) {
            //         console.log('2');
            //         var currentwork = _.find(history, { 'current': 1 }) || _.find(history, { 'current': true });
            //         if (currentwork) {
            //             console.log('3');
            //             async.waterfall([
            //                 function(callback) {
            //                     currentwork.current = 0;
            //                     APIFactory.updateHistory(currentwork.company_id, currentwork).then(function(data) {
            //                         if (data.statusCode == 200 && data.response.success) {
            //                             callback();
            //                         }
            //                     });
            //                 },
            //                 function(callback) {
            //                     APIFactory.createHistory(user_id, $scope.selected).then(function(data) {
            //                         if (data.statusCode == 200 && data.response.result) {
            //                             toastr.success(data.response.msg, 'Success')
            //                             $state.go($state.current, null, { reload: true });
            //                             $uibModalInstance.dismiss('cancel');
            //                         }
            //                     });
            //                 }
            //             ])
            //         } else {
            //             console.log('4');
            //             APIFactory.createHistory(user_id, $scope.selected).then(function(data) {
            //                 if (data.statusCode == 200 && data.response.result) {
            //                     toastr.success(data.response.msg, 'Success')
            //                     $state.go($state.current, null, { reload: true });
            //                     $uibModalInstance.dismiss('cancel');
            //                 }
            //             });
            //         }
            //     } else {
            //         console.log('5');
            //         $scope.selected.current = 0;
            //         console.log('selected:', $scope.selected);
            //         console.log('user_id:', user_id);
            //         APIFactory.createHistory(user_id, $scope.selected).then(function(data) {
            //             if (data.statusCode == 200 && data.response.result) {
            //                 toastr.success(data.response.msg, 'Success')
            //                 $state.go($state.current, null, { reload: true });
            //                 $uibModalInstance.dismiss('cancel');
            //             }
            //         });
            //     }
            // }

        }
    }

})();
