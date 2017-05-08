(function() {
    'use strict';
    angular.module('ICCP')
        .controller('reportCtrl', ['$scope', '$state', 'APIFactory', '$timeout', '$uibModal', reportCtrl])
        .controller('generateCtrl', ['$scope', '$state', '$uibModalInstance', 'items', generateCtrl]);

    function reportCtrl($scope, $state, APIFactory, $timeout, $uibModal) {
        $scope.labels = ["Employed Alumni", "Course Related Job", "Non Related Job"];
        $scope.alumnis = [];
        $scope.jobs = [];
        $scope.lineCharts = {};
        $scope.lineCharts2 = {};
        $scope.areaCharts = [];
        $scope.alljobs = [];
        $scope.byYear = [];
        $scope.alumnicopy = [];
        $scope.lineCharts.xkey = 'DayIndex';
        $scope.lineCharts.ykeys = ["Unemployed"];
        $scope.lineCharts.labels = ['Unemployed'];
        $scope.lineCharts.colors = ["#31C0BE"];
        Chart.defaults.global.legend.display = true;
        Chart.defaults.global.defaultFontColor = '#2b2b2b';
        Chart.defaults.global.responsive = true;
        $scope.lineCharts2.xkey = 'DayIndex';
        $scope.lineCharts2.ykeys = ["Unemployed"];
        $scope.lineCharts2.labels = ['Employed'];
        $scope.lineCharts2.colors = ["#31C0BE"];

        $scope.donut = {};
        $scope.donut.data = [];

        $scope.radioModel = 'All';

        $scope.unemployedList = [];
        $scope.selectedYear = 'All';
        $scope.yearSelected = 'All';
        $scope.courses = [];

        APIFactory.getAllcourse().then(function(data) {
            if (data.statusCode == 200 && data.response.success) {
                $scope.courses = data.response.result;
                $scope.courses.unshift({
                    name: 'All'
                })
            }
        })

        $scope.onClick = function() {
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                size: 'lg',
                scope: $scope,
                templateUrl: './public/templates/folder/report-modal.html',
                controller: 'generateCtrl',
                resolve: {
                    items: function() {
                        return $scope.alumnis
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {}, function() {
                console.info('Modal dismissed at: ' + new Date());
            });
        };
        $scope.getSelectedYear = function(value) {
            console.log('value:', value);
            $scope.selectedYear = value;
            init();
        };
        $scope.getyearSelected = function(value) {
            $scope.yearSelected = value;
            initializedata();
        };
        $scope.getyear = function(value) {
            $scope.year = value;
        };
        var initializedata = function() {
            APIFactory.getAllAlumni().then(function(data) {
                if (data.statusCode = 200 && data.response.success) {
                    var all = [];
                    $scope.byYear = [];
                    var unemployed = [];
                    var unemployeddesignate = [];
                    var employeddesignate = [];
                    var final = [];
                    var group = _.groupBy(data.response.result, 'year_graduate');
                    _.map(group, function(row, key) {
                        $scope.byYear.push({
                            year: key
                        });
                    });
                    $scope.byYear = _.orderBy($scope.byYear, ['year'], ['asc']);
                    $scope.alumnis = data.response.result;
                    console.log('$scope.alumnis:', $scope.alumnis);
                    if ($scope.yearSelected == 'All') {
                        // _.each(data.response.result, function(row) {
                        //     row.date_created = moment(row.date_created).format('YYYY-MM-DD');
                        //     if (row.job_history && row.job_history.length > 0) {
                        //         $scope.jobs.push(row.job_history);
                        //     }
                        // });
                        _.each(data.response.result, function(row) {
                            row.date = moment(row.date_created).format("YYYY");
                            if (row.job_history && row.job_history.length == 0) {
                                unemployed.push(row);
                            }
                        });
                        $scope.employee = _.filter(data.response.result, function(row) {
                            if (row.job_history && row.job_history.length > 0) {
                                return row;
                            }
                        });
                    } else {
                        var result = _.filter(data.response.result, { 'year_graduate': $scope.yearSelected });
                        console.log('result;', result);
                        $scope.employee = _.filter(result, function(row) {
                            if (row.job_history && row.job_history.length > 0) {
                                return row;
                            }
                        });
                    }

                    console.log(' $scope.employee:', $scope.employee);

                    $scope.alumnicopy = angular.copy(data.response.result);

                    $scope.unemployedList = _.uniqBy(unemployed, 'alumni_id');
                    var uniqueDataUnemployed = _.groupBy($scope.unemployedList, 'year_graduate');
                    _.map(uniqueDataUnemployed, function(row, key) {
                        unemployeddesignate.push({
                            DayIndex: key,
                            Unemployed: row.length
                        });
                        all.push({
                            year: key,
                            unemployeed: row.length,
                            type: 'unemployeed'
                        })
                    });

                    // $scope.jobs = _.flattenDeep($scope.jobs);

                    var uniqueDataEmployed = _.groupBy($scope.employee, 'year_graduate');
                    console.log('uniqueDataEmployed:', uniqueDataEmployed);
                    _.map(uniqueDataEmployed, function(row, key) {
                        employeddesignate.push({
                            DayIndex: key,
                            Unemployed: row.length
                        })
                        all.push({
                            year: key,
                            employeed: row.length,
                            type: 'employeed'
                        })
                    });
                    $scope.employed = angular.copy(employeddesignate);
                    var goup = _.groupBy(all, 'year');
                    _.map(goup, function(row, key) {
                        final.push({
                            year: key
                        });
                    });
                    _.each(final, function(row) {
                        var unem = _.find(all, { year: row.year, type: 'unemployeed' });
                        var em = _.find(all, { year: row.year, type: 'employeed' });
                        if (!_.isUndefined(unem)) {
                            if (row.year == unem.year) {
                                row.unemployeed = unem.unemployeed;
                            }
                        } else {
                            row.unemployeed = 0;
                        }
                        if (!_.isUndefined(em)) {
                            if (row.year == em.year) {
                                row.employeed = em.employeed;
                            }
                        } else {
                            row.employeed = 0;
                        }

                        // if (row.year == unem.year && row.year == unem.year) {
                        //     if (!_.isUndefined(unem)) {
                        //         row.unemployeed = unem.unemployeed
                        //     } else {
                        //         row.unemployeed = 0;
                        //     }
                        //     if (!_.isUndefined(em)) {
                        //         row.employeed = em.employeed
                        //     } else {
                        //         row.employeed = 0;
                        //     }
                        // }
                    });
                    $scope.unemployed = angular.copy(unemployeddesignate);
                    $timeout(function() {
                        $scope.$apply(function() {
                            if ($scope.radioModel == 'Unemployed') {
                                $scope.lineCharts.data = unemployeddesignate;
                            } else if ($scope.radioModel == 'All') {
                                $scope.areaCharts = final;
                            } else if ($scope.radioModel == 'Employed') {
                                $scope.lineCharts2.data = employeddesignate;
                            }
                            console.log('$scope.lineCharts2:', $scope.lineCharts2)
                            console.log('$scope.lineCharts:', $scope.lineCharts)
                            console.log('$scope.areaCharts:', $scope.areaCharts)
                        });
                    }, 1000);
                }
            });
        }

        var init = function() {
            $scope.data1 = [];
            APIFactory.getAllAlumni().then(function(data) {
                if (data.statusCode == 200 && data.response.success) {
                    var unemployed = [];
                    var employed = [];
                    var job_employed = [];
                    var job_unemployed = [];
                    var courserelated = [];
                    var nocourserelated = [];
                    var totalrelated = [];
                    var donut = [];
                    var nonrelate = [];
                    var allalumni = data.response.result;
                    if ($scope.selectedYear == 'All') {
                        _.each(data.response.result, function(row) {
                            row.date_created = moment(row.date_created).format('YYYY-MM-DD');
                            row.date = moment(row.date_created).format("YYYY");
                            if (row.job_history && row.job_history.length !== 0) {
                                _.some(row.job_history, function(row2) {
                                    if (row2.current == 1) {
                                        employed.push(row);
                                        job_employed.push(row2);
                                    } else if (row2.current == 0) {
                                        unemployed.push(row);
                                        job_unemployed.push(row2);
                                    }
                                });
                            }
                        });
                    } else {
                        var yearfilter = _.filter(data.response.result, { 'year_graduate': $scope.selectedYear });
                        _.each(yearfilter, function(row) {
                            row.date_created = moment(row.date_created).format('YYYY-MM-DD');
                            row.date = moment(row.date_created).format("YYYY");
                            if (row.job_history && row.job_history.length !== 0) {
                                _.some(row.job_history, function(row2) {
                                    if (row2.current == 1) {
                                        employed.push(row);
                                    } else {
                                        unemployed.push(row);
                                        job_unemployed.push(row2);
                                    }
                                    job_employed.push(row2);
                                });
                            }

                        })
                    }

                    console.log('employed;', employed);
                    employed = _.uniqBy(employed, 'alumni_id');
                    donut.push({
                        value: "2",
                        label: "Employed"
                    });
                    $scope.data1.push(employed.length);
                    var gourprelated = _.groupBy(employed, 'alumni_id');
                    _.map(gourprelated, function(row, key) {
                        _.some(row, function(row2) {
                            courserelated = _.filter(row2.job_history, { 'job_related': 1 });
                            nonrelate = _.filter(row2.job_history, { 'job_related': 0 });
                        });
                        if (courserelated && courserelated.length > 0) {
                            totalrelated.push(courserelated);
                        }
                        if (nonrelate && nonrelate.length > 0) {
                            nocourserelated.push(nonrelate);
                        }
                        var sample = courserelated.length / employed.length;
                    });
                    totalrelated = _.flattenDeep(totalrelated);
                    console.log('totalrelated:', totalrelated);
                    nocourserelated = _.flattenDeep(nocourserelated);
                    console.log('nocourserelated:', nocourserelated);
                    console.log('job_employed:', job_employed);
                    job_employed = _.uniqBy(job_employed);
                    nocourserelated = _.uniqBy(nocourserelated);
                    var sumNonRelate = Math.round((nocourserelated.length / job_employed.length) * 100, sumNonRelate, 0);
                    var sum = Math.round((totalrelated.length / job_employed.length) * 100, sum, 0);
                    console.log('sumNonRelate:', sumNonRelate);
                    console.log('sum:', sum);
                    $scope.data1.push(sum.toString());
                    donut.push({
                        value: sum.toString(),
                        label: "Course Related Job"
                    });
                    donut.push({
                        value: sumNonRelate.toString(),
                        label: "Non Related Job"
                    });
                    $scope.data1.push(sumNonRelate.toString());
                    console.log('$scope.data1:', $scope.data1);
                    $timeout(function() {
                        $scope.$apply(function() {
                            $scope.donut.data = donut;
                        });
                    }, 1000);
                }
            })
        }
        initializedata();

        init();

        $scope.exportModal = function() {
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                size: 'lg',
                scope: $scope,
                templateUrl: './public/templates/folder/export-modal.html',
                controller: 'exportCtrl',
                resolve: {
                    years: function() {
                        return $scope.byYear;
                    },
                    jobs: function() {
                        return $scope.alumnicopy;
                    },
                    courses: function() {
                        return $scope.courses;
                    }
                }
            });


            modalInstance.result.then(function(selectedItem) {}, function() {});
        };

        $scope.switchGraph = function(value) {
            $scope.radioModel = value;
            $timeout(function() {
                $scope.$apply(function() {
                    if ($scope.radioModel == 'Unemployed') {
                        $scope.lineCharts.data = $scope.unemployed;
                    } else {
                        $scope.lineCharts2.data = $scope.employed;
                    }
                });
            }, 1000);
        };

          $scope.printAlumni = function() {
            $scope.years = [];
            console.log('diri', $scope.courses);
            $scope.years = $scope.byYear;
            console.log('dirssi', $scope.years);
            var list = [];
            var listcopy = [];
            var modalInstance = $uibModal.open({
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                size: 'lg',
                scope: $scope,
                templateUrl: './public/templates/folder/print-alumni-modal.html'
            });
            $scope.cancel = function() {
                modalInstance.dismiss('cancel');
            };

            $scope.checkyear = function(value) {
                $scope.year = value;
                $scope.list = []
                $scope.schoolyear = (value - 1) + '-' + value;
                list = _.filter($scope.alumnicopy, function(row) {
                    return parseInt(row.year_graduate) == value;
                });
                listcopy = angular.copy(list);
                console.log('list:', list);
            };
            $scope.checkCourse = function(value) {
                console.log('list:', list);
                console.log('value:', value)
                $scope.display = true;
                if (value == 'All') {
                    $scope.list = listcopy;
                } else {
                    $scope.list = _.filter(list, function(row) {
                        return row.course.name == value;
                    })
                }
                console.log('$scope.list:', $scope.list);
            }
            $scope.printAlumni = function(name) {
                console.log('sample:',name);
                var printContents = document.getElementById('printalumni').innerHTML;
                // var printContents = document.getElementById(name).innerHTML;
                var popupWin = window.open("");
                popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
                popupWin.document.close();
            };

            modalInstance.result.then(function(selectedItem) {}, function() {
                console.info('Modal dismissed at: ' + new Date());
                $state.go($state.current,null,{reload:true});
            });
        }
    }

    function generateCtrl($scope, $state, $uibModalInstance, items) {

        $scope.report = function(value) {
            $scope.selected = value;
            var data = [];
            $scope.list = [];
            if (value == 'Employeed') {
                data = _.filter(items, function(row) {
                    if (row.job_history && row.job_history.length > 0) {
                        return _.some(row.job_history, function(row2) {
                            return row2.current == 1;
                        });
                    }
                });
            } else {
                data = _.filter(items, function(row) {
                    if (row.job_history.length == 0) {
                        return row;
                    }
                });
            }
            $scope.list = data;
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }

    }
})();
