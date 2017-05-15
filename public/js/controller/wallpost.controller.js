(function() {
    'use strict';
    angular.module('ICCP')
        .controller('postingCtrl', postingCtrl);
    postingCtrl.$inject = ['$scope', 'APIFactory', 'toastr', '$state', 'localStorageService', 'Upload',
        'API_URL', 'API_VERSION', 'ngTableParams', '$uibModal', '$filter'
    ];

    function postingCtrl($scope, APIFactory, toastr, $state, localStorageService, Upload,
        API_URL, API_VERSION, ngTableParams, $uibModal, $filter) {
        console.log('postingCtrl');
        $scope.details = {};
        $scope.onlyme = [];
        $scope.filtervalue = 'All';
        $scope.txtSearch = '';
        $scope.batches = [];
        $scope.batchcopy = [];
        $scope.recentpost = [];
        $scope.filtercat = [];
        $scope.filterbatch = [];
        $scope.postbyBatch = [];
        $scope.alumni = [];
        var user = JSON.parse(localStorageService.get('appuser'));
        $scope.ojtbol = [{
            id: 1,
            status: 'Yes'
        }, {
            id: 2,
            status: 'No',
        }]
        $scope.user = {
            name: 'sample'
        }
        $scope.selected = {};
        $scope.selected.value = 'all';
        $scope.categorypost = [{ name: 'View all', checked: true }, { name: 'Event' }, { name: 'Job Hiring' }, { name: 'News' }, { name: 'Others' }, { name: 'Only me' }];

        $scope.details.account_id = user.account_id;
        $scope.details.post;

        // if (user.account_id) {

        // }
        // setTimeout(function() {
        //     $scope.$apply(function() {

        //     });
        // }, 2000);

        $scope.upload = function(file) {
            $scope.newImage = true;
        };

        $scope.post = function() {
            $scope.details.for_ojt = {};
            if (user.person_type == 'Alumni') {
                $scope.details.approved = 0;
            } else if (user.person_type == 'Admin') {
                $scope.details.approved = 1;
            }
            if ($scope.details.category == 'Job Hiring') {
                var checkojt = _.find($scope.ojtbol, { 'checked': true });
                if (!_.isUndefined(checkojt)) {
                    if (checkojt.status == 'No') {
                        $scope.details.for_ojt = 0;
                    } else if (checkojt.status == 'Yes') {
                        $scope.details.for_ojt = 1;
                    }
                } else {
                    $scope.details.for_ojt = null;
                }
                $scope.details.event_date = null;
                $scope.details.event_end = null;
                $scope.details.event_end = null;
            } else if ($scope.details.category == 'Event') {
                $scope.details.event_start = moment($scope.details.event_start).format('h:mm A');
                $scope.details.event_end = moment($scope.details.event_end).format('h:mm A');
                $scope.details.for_ojt = null;
                $scope.details.jobcourse_related = null;
            } else {
                $scope.details.for_ojt = null;
                $scope.details.jobcourse_related = null;
                $scope.details.event_date = null;
                $scope.details.event_end = null;
                $scope.details.event_end = null;
            }

            async.waterfall([
                function(callback) {
                    APIFactory.postWall($scope.details).then(function(data) {
                        if (data.statusCode == 200 && data.response.success) {
                            toastr.success(data.response.msg, 'Success');
                            callback(null, data.response.result);
                        } else if (data.statusCode == 400 && !data.response.success) {
                            _.each(data.response.result, function(row) {
                                toastr.warning(row.msg, 'Warning!');
                            });
                        }
                    });
                },
                function(wall_id, callback) {
                    if ($scope.newImage && $scope.details.image_path) {
                        Upload.upload({
                            url: API_URL + API_VERSION + 'wallpost/' + wall_id + '/upload-image',
                            data: { image_path: $scope.details.image_path },
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
                                toastr.error(resp.data.response.msg, 'Error');
                                return;
                            }
                        }, function(resp) {
                            console.log('Error status: ' + resp.status);
                        }, function(evt) {
                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);

                        });
                    } else {
                        $state.go($state.current, null, { reload: true });
                    }
                }
            ])
        };


        $scope.itemcheck = function(item) {
            _.each($scope.ojtbol, function(row) {
                if (row.id == item.id) {
                    row.checked = true;
                } else {
                    row.checked = false;
                }
            });
        }
        $scope.filterList = function(value) {
            $scope.filtervalue = value;
            $scope.postTable.reload();
        };


        $scope.viewPost = function(id) {
            $scope.object = {};
            if (id) {
                $scope.object = _.find($scope.allpost, { 'wall_id': id });
                console.log($scope.object);
            }
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                scope: $scope,
                templateUrl: './public/templates/folder/post-modal.html'
            });
            $scope.approve = function(value) {
                console.log(value);
                var detail = value;
                detail.approved = 1;
                APIFactory.editPost(value.wall_id, detail).then(function(data) {
                    if (data.statusCode == 200 && data.response.success) {
                        $scope.cancel();
                        $state.go($state.current, {}, { reload: true });
                    }
                });
            }
            $scope.deletepost = function(val) {
                APIFactory.deletePost(val.wall_id).then(function(data) {
                    if (data.statusCode == 200 && data.response.success) {
                        $scope.cancel();
                        $state.go($state.current, {}, { reload: true });
                    }
                });
            }
            $scope.cancel = function() {
                modalInstance.dismiss('cancel');
            }

        }
        $scope.togglepost = function(course) {
            _.each($scope.courses, function(row) {
                if (row.course_id !== course.course_id) {
                    row.checked = false;
                }
            });
            if (course.description == 'VIEW ALL') {
                if (user.person_type == 'Alumni') {
                    $scope.approvedpost = $scope.approvedpostcopy;
                } else {
                    $scope.allpost = $scope.allpostcopy;
                }
            } else if (course.description == 'ONLY ME') {
                if (user.person_type == 'Alumni') {
                    $scope.approvedpost = $scope.onlyme;
                } else {
                    $scope.allpost = $scope.onlyme;
                }
            } else {
                if (user.person_type == 'Alumni') {
                    $scope.approvedpost = _.filter($scope.approvedpostcopy, { 'course_id': course.course_id });
                } else {
                    $scope.allpost = _.filter($scope.allpostcopy, { 'course_id': course.course_id });
                }
            }
        };

        $scope.getCategory = function(item) {
            if (item == 'Job Hiring') {
                $scope.hiring = true;
                $scope.event = false;
                $scope.details.for_ojt = null;
                $scope.details.jobcourse_related = null;
            } else if (item == 'Event') {
                // $scope.details.event_start = new Date(1970, 0, 1, 10, 30, 40);
                $scope.details.event_start = moment(new Date()).format('h:mm A');
                $scope.details.event_end = moment(new Date()).format('h:mm A');
                // $scope.details.event_start = "1970-01-01T02:30:40.000Z";
                // $scope.details.event_end = "1970-01-01T02:30:40.000Z";
                $scope.hiring = false;
                $scope.event = true;
                $scope.details.event_date = null;
                $scope.details.event_start = null;
                $scope.details.event_end = null;
            } else if (item == 'News') {
                $scope.other = true;
                $scope.hiring = false;
                $scope.event = false;
                $scope.details.for_ojt = null;
                $scope.details.jobcourse_related = null;
                $scope.details.event_date = null;
                $scope.details.event_start = null;
                $scope.details.event_end = null;
            } else if (item == 'Others') {
                $scope.other = true;
                $scope.hiring = false;
                $scope.event = false;
                $scope.details.for_ojt = null;
                $scope.details.jobcourse_related = null;
                $scope.details.event_date = null;
                $scope.details.event_start = null;
                $scope.details.event_end = null;
            }

            $scope.details.category = item;
        };
        $scope.getBatch = function(value) {
            if (value.name == 'all') {
                if (!_.isEmpty($scope.filtercat)) {
                    $scope.allpostcopy = $scope.filtercat;
                } else {
                    $scope.allpostcopy = $scope.recentpost;
                }
            } else {
                if (!_.isEmpty($scope.filtercat)) {
                    $scope.allpostcopy = _.filter($scope.filtercat, function(row) {
                        if (row.alumni) {
                            return row.alumni.year_graduate == value.value;
                        }
                    });
                } else {
                    $scope.allpostcopy = _.filter($scope.recentpost, function(row) {
                        if (row.alumni) {
                            return row.alumni.year_graduate == value.value;
                        }
                    });
                }
            }
            $scope.filterbatch = angular.copy($scope.allpostcopy);
        };

        $scope.getCategorypost = function(value) {
            console.log('value==>', value);
            _.each($scope.categorypost, function(row) {
                if (row.name !== value.name) {
                    row.checked = false;
                }
            });
            if (value.name == 'Only me') {
                $scope.allpostcopy = $scope.onlyme;
            } else if (value.name == 'View all') {
                $scope.allpostcopy = $scope.recentpost;
            } else {
                $scope.allpostcopy = _.filter($scope.recentpost, { 'category': value.name });
            }
            $scope.filtercat = angular.copy($scope.allpostcopy);
            // if (user.person_type == 'Alumni') {
            //     if (value.name == 'Only me') {
            //         $scope.allpostcopy = $scope.onlyme;
            //     } else if (value.name == 'View all') {
            //         $scope.allpostcopy = $scope.recentpost;
            //     } else {
            //         $scope.allpostcopy = _.filter($scope.recentpost, { 'category': value.name });
            //     }
            //     $scope.filtercat = angular.copy($scope.allpostcopy);
            // } else {

            // }
        };

        // var initialize = function() 
        //     $scope.edittoggle = true;
        //     async.waterfall([
        //         function(cb) {
        //             console.log('1');
        //             APIFactory.getDetailAlumni(user.account_id).then(function(data) {
        //                 if (data.statusCode == 200 && data.response.success) {
        //                     $scope.alumni = data.response.result;
        //                     cb();
        //                 }
        //             });
        //         },
        //         function(cb) {
        //             console.log('2');
        //             APIFactory.getAllcourse().then(function(data) {
        //                 if (data.statusCode == 200 && data.response.success) {
        //                     $scope.courses = data.response.result;
        //                     $scope.coursecopy = angular.copy(data.response.result);
        //                     $scope.courses.unshift({
        //                         course_id: '001',
        //                         checked: false,
        //                         description: 'ONLY ME'
        //                     })
        //                     $scope.courses.unshift({
        //                         course_id: 0,
        //                         checked: true,
        //                         description: 'VIEW ALL'
        //                     })
        //                     console.log('$scope.courses:', $scope.courses);
        //                 }
        //             });
        //         }
        //     ])

        // }

        var getpost = function() {
            $scope.courses = [];
            $scope.coursecopy = [];
            async.waterfall([
                function(callback) {
                    APIFactory.getAllBatch().then(function(data) {
                        if (data.statusCode == 200 && data.response.success) {
                            $scope.batches = data.response.result;
                            $scope.batches.unshift({
                                name: 'View',
                                year_graduated: 'all'
                            })
                            callback();
                        }
                    })
                },
                function(callback) {
                    APIFactory.getAllcourse().then(function(data) {
                        if (data.statusCode == 200 && data.response.success) {
                            $scope.courses = data.response.result;
                            $scope.coursecopy = angular.copy(data.response.result);
                            $scope.courses.unshift({
                                course_id: '001',
                                checked: false,
                                description: 'ONLY ME'
                            })
                            $scope.courses.unshift({
                                course_id: 0,
                                checked: true,
                                description: 'VIEW ALL'
                            })
                            callback(null);
                        }
                    });
                },
                function(callback) {
                    if (user.person_type == 'Admin') {
                        $scope.postTable = new ngTableParams({
                            page: 1,
                            count: 5
                        }, {
                            counts: [],
                            paginationMaxBlocks: 13,
                            paginationMinBlocks: 2,
                            getData: function($defer, params) {
                                $scope.allpost = [];
                                $scope.approvedpost = [];
                                $scope.allpostcopy = [];
                                $scope.filtercopy = [];
                                APIFactory.getallPost().then(function(data) {
                                    if (data.statusCode == 200 && data.response.success) {
                                        _.each(data.response.result, function(row) {
                                            if (row.alumni) {
                                                row.course_id = row.alumni.course.course_id;
                                                row.name = row.alumni.firstname;
                                            } else {
                                                row.name = 'Admin';
                                            }
                                        });
                                        $scope.allpost = data.response.result;
                                        $scope.allpostcopy = angular.copy(data.response.result);
                                        $scope.recentpost = angular.copy(data.response.result);
                                        $scope.onlyme = _.filter(data.response.result, { 'name':'Admin'});
                                        // if (_.isEmpty($scope.txtSearch)) {
                                        //     $scope.allpost = $scope.allpostcopy;
                                        // } else if (!_.isEmpty($scope.txtSearch)) {
                                        //       $scope.allpost = $filter('filter')($scope.allpostcopy, $scope.txtSearch);
                                        // }
                                        if (!_.isEmpty($scope.txtSearch) && $scope.filtervalue == 'All') {
                                            $scope.allpost = $filter('filter')(data.response.result, $scope.txtSearch);
                                        } else if (!_.isEmpty($scope.txtSearch) && $scope.filtervalue !== 'All') {
                                            $scope.allpost = $filter('filter')(data.response.result, { 'category': $scope.filtervalue });
                                            $scope.allpost = $filter('filter')($scope.allpost, $scope.txtSearch);
                                        } else if (_.isEmpty($scope.txtSearch) && $scope.filtervalue !== 'All') {
                                            $scope.allpost = $filter('filter')(data.response.result, { 'category': $scope.filtervalue });
                                        } else if (_.isEmpty($scope.txtSearch) && $scope.filtervalue == 'All') {
                                            $scope.allpost = data.response.result;
                                        }
                                        console.log('allpost:',$scope.allpost);
                                        // if (_.isEmpty($scope.txtSearch) && _.isEmpty($scope.filtercopy)) {
                                        //     $scope.allpost = $scope.allpostcopy;
                                        // } else if (!_.isEmpty($scope.txtSearch) && _.isEmpty($scope.filtercopy)) {
                                        //     $scope.allpost = $filter('filter')($scope.allpostcopy, $scope.txtSearch);
                                        // } else if (!_.isEmpty($scope.txtSearch) && !_.isEmpty($scope.filtercopy)) {
                                        //     $scope.allpost = $filter('filter')($scope.filtercopy, $scope.txtSearch);
                                        // } else if (_.isEmpty($scope.txtSearch) && !_.isEmpty($scope.filtercopy)) {
                                        //     if ($scope.filtervalue == 'All') {
                                        //         $scope.allpost = $scope.allpostcopy;
                                        //         $scope.filtercopy = angular.copy($scope.allpost);
                                        //     } else if ($scope.filtervalue !== 'All') {
                                        //         $scope.allpost = _.filter($scope.allpostcopy, { 'category': $scope.filtervalue });
                                        //         $scope.filtercopy = angular.copy($scope.allpost);
                                        //     }
                                        // } else {
                                        //     $scope.allpost = $scope.allpostcopy;
                                        // }

                                        params.total($scope.allpost.length);
                                        var responsedata = $scope.allpost.slice((params.page() - 1) * params.count(), params.page() * params.count());
                                        $defer.resolve(responsedata);

                                    };
                                });
                            }
                        });
                    } else {
                        $scope.allpost = [];
                        $scope.approvedpost = [];
                        $scope.courses = [];
                        $scope.coursecopy = [];
                        $scope.allpostcopy = [];
                        async.waterfall([
                            function(cb) {
                                APIFactory.getAllAlumni().then(function(data) {
                                    if (data.statusCode == 200 && data.response.success) {
                                        $scope.alumni = data.response.result;
                                        $scope.user = _.find(data.response.result, { 'alumni_id': user.account_id });
                                        cb(null, $scope.user);
                                    }
                                })
                            },
                            function(userdetail, cb) {
                                APIFactory.getallPost().then(function(data) {
                                    if (data.statusCode == 200 && data.response.success) {
                                        _.each(data.response.result, function(row) {
                                            if (row.alumni) {
                                                row.course_id = row.alumni.course.course_id
                                            }
                                        });
                                        var first = _.filter(data.response.result, function(row) {
                                            if (_.isEmpty(row.alumni)) {
                                                return row;
                                            }
                                        });
                                        $scope.allpost = _.filter(data.response.result, function(row) {
                                            if (row.alumni) {
                                                return row.alumni.year_graduate == userdetail.year_graduate;
                                            }
                                        });
                                        $scope.allpost.push(first);
                                        $scope.allpost = _.flattenDeep($scope.allpost);
                                        // $scope.allpost = data.response.result;
                                        $scope.allpostcopy = angular.copy($scope.allpost);
                                        $scope.recentpost = angular.copy($scope.allpostcopy);
                                        $scope.onlyme = _.filter(data.response.result, { 'approved': 1, 'account_id': user.account_id });
                                        // $scope.approvedpost = _.filter(data.response.result, { 'approved': 1 });
                                        // $scope.approvedpostcopy = angular.copy($scope.approvedpost);

                                    };
                                });
                            }
                        ])

                    }
                }
            ])

        }
        getpost();

        $scope.searchData = function() {
            $scope.postTable.reload();
        };

        $scope.editpost = function(value) {
            APIFactory.editPost(value.wall_id, {
                account_id: value.alumni_id,
                post: value.post,
                approved: value.approved
            }).then(function(data) {
                if (data.statusCode == 200 && data.response.success) {
                    toastr.success(data.response.msg, 'Success');
                    initialize();
                } else {
                    toastr.error(data.response.msg, 'Error');
                }
            })
        }

    }

})();
