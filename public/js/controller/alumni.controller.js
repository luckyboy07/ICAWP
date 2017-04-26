(function() {
    'use strict';
    angular.module('ICCP')
        .controller('alumniCtrl', alumniCtrl)
        .controller('exportCtrl', exportCtrl);
    alumniCtrl.$inject = ['$scope', '$state', 'APIFactory', '$filter', '$uibModal', 'toastr', 'ngTableParams'];
    exportCtrl.$inject = ['$scope', '$state', '$uibModalInstance', 'years', 'jobs', 'courses'];

    function alumniCtrl($scope, $state, APIFactory, $filter, $uibModal, toastr, ngTableParams) {
        console.log('alumniCtrl');

        $scope.byYear = [];
        $scope.alljobs = [];
        $scope.txtSearch = '';
        $scope.applicationStatus = 'All';
        $scope.courses = [];
        $scope.display = false;
        APIFactory.getAllcourse().then(function(data) {
            if (data.statusCode == 200 && data.response.success) {
                $scope.courses = data.response.result;
                $scope.courses.unshift({
                    name: 'All'
                })
            }
        })
        var initialize = function() {
                // async.waterfall([
                //     function(callback) {
                //         APIFactory.getAlljob().then(function(data) {
                //             if (data.statusCode == 200 && data.response.success) {
                //                 $scope.alljobs = data.response.result;
                //                 callback(null);
                //             }
                //         });
                //     },
                //     function(callback) {
                //         APIFactory.getAllAlumni().then(function(data) {
                //             if (data.statusCode = 200 && data.response.success) {
                //                 $scope.alumnis = data.response.result;
                //                 $scope.alumnicopy = angular.copy(data.response.result);
                //                 var group = _.groupBy(data.response.result, 'year_graduate');
                //                 _.map(group, function(row, key) {
                //                     $scope.byYear.push({
                //                         year: key
                //                     });
                //                 });
                //                 $scope.byYear = _.orderBy($scope.byYear, ['year'], ['asc']);
                //                 _.each($scope.byYear, function(row) {
                //                     row.years = parseInt(row.year);
                //                 });
                //             }
                //         });
                //     }
                // ])
                $scope.alumniTable = new ngTableParams({
                    page: 1,
                    count: 5
                }, {
                    counts: [5, 10, 50, 100],
                    paginationMaxBlocks: 13,
                    paginationMinBlocks: 2,
                    getData: function($defer, params) {
                        $scope.alumnis = [];
                        $scope.alumnicopy = [];
                        APIFactory.getAllAlumni().then(function(data) {
                            if (data.statusCode = 200 && data.response.success) {
                                var group = _.groupBy(data.response.result, 'year_graduate');
                                _.map(group, function(row, key) {
                                    $scope.byYear.push({
                                        year: key
                                    });
                                });

                                $scope.alumnis = data.response.result;
                                $scope.alumnicopy = angular.copy(data.response.result);
                                $scope.byYear = _.orderBy($scope.byYear, ['year'], ['asc']);
                                _.each($scope.byYear, function(row) {
                                    row.years = parseInt(row.year);
                                });
                                console.log('$scope.alumnis:', $scope.alumnis);
                                $scope.accountalumni = _.filter($scope.alumnis, { 'Uaccount_status': 1 });
                                if (_.isEmpty($scope.txtSearch)) {
                                    $scope.alumnis = $scope.alumnicopy;
                                } else if (!_.isEmpty($scope.txtSearch)) {
                                    $scope.alumnis = $filter('filter')($scope.alumnicopy, $scope.txtSearch);
                                }

                                params.total($scope.alumnis.length);
                                var responsedata = $scope.alumnis.slice((params.page() - 1) * params.count(), params.page() * params.count());
                                $defer.resolve(responsedata);

                            }
                        });
                    }
                })
            }
            // var populateData = function() {
            //     $scope.productTable = new ngTableParams({
            //         page: 1,
            //         count: 20
            //     }, {
            //         counts: [20, 45, 60, 100],
            //         getData: function($defer, params) {
            //             $scope.productIsLoading = true;
            //             $scope.products = [];
            //             $scope.productscopy = [];

        //             productFactory.getAllProduct().then(function(data) {
        //                 if (data.statusCode == 200 && data.response.success) {
        //                     var products = data.response.result;
        //                     $scope.totalItems = products.length;
        //                     $scope.productscopy = angular.copy(data.response.result);


        //                     if ($scope.txtSearch && $scope.applicationStatus == 'All' && _.isEmpty($scope.currentNode)) {
        //                         console.log('1');
        //                         $scope.products = $filter('filter')(products, $scope.txtSearch);
        //                     } else if ($scope.txtSearch && $scope.applicationStatus == 'Publish' && _.isEmpty($scope.currentNode)) {
        //                         console.log('2');
        //                         $scope.products = $filter('filter')(products, { 'is_published': 1 });
        //                         $scope.products = $filter('filter')($scope.products, $scope.txtSearch);

        //                     } else if ($scope.txtSearch && $scope.applicationStatus == 'Archived' && _.isEmpty($scope.currentNode)) {
        //                         console.log('3');
        //                         $scope.products = $filter('filter')(products, { 'is_archived': 1 });
        //                         $scope.products = $filter('filter')($scope.products, $scope.txtSearch);

        //                     } else if ($scope.txtSearch && $scope.applicationStatus == 'Draft' && _.isEmpty($scope.currentNode)) {
        //                         console.log('4');
        //                         $scope.products = $filter('filter')(products, { 'is_published': 0 });
        //                         $scope.products = $filter('filter')($scope.products, $scope.txtSearch);

        //                     } else if (_.isEmpty($scope.txtSearch) && $scope.applicationStatus == 'All') {
        //                         if (!_.isEmpty($scope.currentNode)) {
        //                             _.each($scope.productsToFilter, function(row) {
        //                                 var result = _.find(products, { 'p_id': row.p_id });
        //                                 if (result) {
        //                                     $scope.products.push(result);
        //                                 }
        //                             });
        //                         } else {
        //                             $scope.products = products;
        //                         }
        //                     } else if (_.isEmpty($scope.txtSearch) && $scope.applicationStatus == 'Publish') {
        //                         console.log('6');
        //                         if (!_.isEmpty($scope.currentNode)) {
        //                             var newproducts = $filter('filter')(products, { 'is_published': 1 });
        //                             _.each($scope.productsToFilter, function(row) {
        //                                 var result = _.find(newproducts, { 'p_id': row.p_id });
        //                                 if (result) {
        //                                     $scope.products.push(result);
        //                                 }
        //                             });
        //                         } else {
        //                             $scope.products = $filter('filter')(products, { 'is_published': 1 });
        //                         }
        //                     } else if (_.isEmpty($scope.txtSearch) && $scope.applicationStatus == 'Archived') {
        //                         console.log('7');
        //                         if (!_.isEmpty($scope.currentNode)) {
        //                             var newproducts = $filter('filter')(products, { 'is_archived': 1 });
        //                             _.each($scope.productsToFilter, function(row) {
        //                                 var result = _.find(newproducts, { 'p_id': row.p_id });
        //                                 if (result) {
        //                                     $scope.products.push(result);
        //                                 }
        //                             });
        //                         } else {
        //                             $scope.products = $filter('filter')(products, { 'is_archived': 1 });
        //                         }
        //                     } else if (_.isEmpty($scope.txtSearch) && $scope.applicationStatus == 'Draft') {
        //                         console.log('8');
        //                         if (!_.isEmpty($scope.currentNode)) {
        //                             var newproducts = $filter('filter')(products, { 'is_published': 0 });
        //                             _.each($scope.productsToFilter, function(row) {
        //                                 var result = _.find(newproducts, { 'p_id': row.p_id });
        //                                 if (result) {
        //                                     $scope.products.push(result);
        //                                 }
        //                             });
        //                         } else {
        //                             $scope.products = $filter('filter')(products, { 'is_published': 0 });
        //                         }
        //                     } else {
        //                         $scope.products = products;
        //                     }



        //                     if ($scope.filterStatus == 'Most Viewed') {
        //                         $scope.products = $filter('orderBy')($scope.products, 'product_views', true);
        //                         $scope.products = _.filter($scope.products, function(val) {
        //                             return (parseInt(val.product_views) > 0);
        //                         });
        //                     } else if ($scope.filterStatus == 'Price: High to Low') {
        //                         $scope.products = $filter('orderBy')($scope.products, 'sell_price', true);
        //                     } else if ($scope.filterStatus == 'Price: Low to High') {
        //                         $scope.products = $filter('orderBy')($scope.products, 'sell_price', false);
        //                     }


        //                     if ($scope.tagsFilter && $scope.tagsFilter.length > 0) {
        //                         var productData = [];

        //                         _.each($scope.tagsFilter, function(row) {
        //                             _.each($scope.products, function(row2) {
        //                                 var result = _.find(row2.tags, { 'tags_id': row.id });
        //                                 if (result) {
        //                                     productData.push(row2);
        //                                 }
        //                             })
        //                         });

        //                         $scope.products = productData;
        //                     }


        //                     params.total($scope.products.length);
        //                     var responsedata = $scope.products.slice((params.page() - 1) * params.count(), params.page() * params.count());
        //                     $defer.resolve(responsedata);

        //                     $scope.productIsLoading = false;
        //                 } else {
        //                     $scope.productIsLoading = false;
        //                     toastr.error(data.response.msg, 'Error');
        //                 }

        //             });
        //         }
        //     });
        // };

        $scope.searchData = function() {
            $scope.alumniTable.reload();
        };

        $scope.updateStatus = function(name) {
            $scope.applicationStatus = name;
        };


        $scope.exportModal = function() {
            console.log('diri', $scope.courses);
            $scope.years = [];
            $scope.years = $scope.byYear;
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
            $scope.printDiv = function() {
                console.log('sample');
                var printContents = document.getElementById('print').innerHTML;
                var popupWin = window.open("");
                popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
                popupWin.document.close();
            };

            modalInstance.result.then(function(selectedItem) {}, function() {
                console.info('Modal dismissed at: ' + new Date());
                $scope.refresh();
            });
        };

        $scope.refresh = function() {
            initialize();
        };

        $scope.refresh();
    }

    function exportCtrl($scope, $state, $uibModalInstance, years, jobs, courses) {
        console.log('asdasd', courses);
        $scope.courses = courses;
        $scope.years = [];
        $scope.years = years;
        $scope.list = [];
        $scope.lastlist = [];
        $scope.finalList = [];
        $scope.lastlistcopy = [];
        $scope.displayyear = false;
        $scope.displaycourse = false;
        _.each(years, function(row) {
            row.years = parseInt(row.year);
        });
        _.each(jobs, function(row) {
            if (row.job_history.length > 0) {
                row.latest_job = _.find(row.job_history, { 'current': 1, 'date_to': null });
                row.last_job = _.find(row.job_history, { 'current': null }) || _.find(row.job_history, { 'current': 0 });
            } else if (row.job_history && row.job_history.length == 0) {
                row.status = 'last';
            }
            if (row.latest_job) {
                row.status = 'latest';
            } else if (row.last_job) {
                row.status = 'last';
            }
        });
        console.log('exportCtrl:', years);
        console.log('exportCtrl:', jobs);
        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
        $scope.report = function(value) {
            console.log('value:', value);
            $scope.displayyears = value;
            $scope.displaycourse = true;
            if (value == 'Employed') {
                $scope.lastlist = _.filter($scope.list, { 'status': 'latest' });
            } else {
                $scope.lastlist = _.filter($scope.list, { 'status': 'last' });
            }
            $scope.lastlist = _.uniqBy($scope.lastlist,'alumni_id');
            $scope.lastlistcopy = angular.copy($scope.lastlist);
            console.log('$scope.lastlist:', $scope.lastlist);
        };
        $scope.reportCourse = function(value) {
            $scope.displaylist = true;
            if (value == 'All') {
                $scope.finalList = $scope.lastlistcopy;
            } else {
                $scope.finalList = _.filter($scope.lastlist, function(row) {
                    if (row.course) {
                        return row.course.name == value;
                    }
                });
            }
            console.log('$scope.finalList:', $scope.finalList);
        };

        $scope.checkyear = function(value) {
            console.log('value:', value);
            $scope.displayyear = true;
            $scope.year = value;
            $scope.schoolyear = (value - 1) + '-' + value;
            var list = []
            $scope.list = _.filter(jobs, function(row) {
                return parseInt(row.year_graduate) == value;
            });
            _.each($scope.list, function(row) {
                if (row.last_job) {
                    row.last_job.experience = dateDiff(row.last_job.date_from, row.last_job.date_to);
                }
            });
        };
        var formatString = function(format) {
            var pieces = format.split('.'),
                year = parseInt(pieces[0]),
                month = parseInt(pieces[1]),
                day = parseInt(pieces[2]),
                date = new Date(year, month - 1, day);
            return date;
        };

        function day_of_the_month(d) {
            return (d.getDate() < 10 ? '0' : '') + d.getDate();
        }

        var dateDiff = function(fromDate, toDate) {
            var from = new Date(fromDate);
            var to = new Date(toDate);
            console.log('from:', from)
            console.log('to:', to)
            var d1_year = to.getFullYear();
            var d2_year = from.getFullYear();
            var d1_month = to.getMonth();
            var d2_month = from.getMonth();
            var d1_day = day_of_the_month(to);
            var d2_day = day_of_the_month(from);
            var d = new Date();
            if (d1_year == d2_year) {
                if (d1_month == d2_month) {
                    var resut = d1_day - d2_day;
                    return result > 1 ? resut + ' day' : resut + ' days';
                } else {
                    var resut = d1_month - d2_month;
                    return resut > 1 ? resut + ' month' : resut + ' months';
                }
            } else {
                var result = d1_year - d2_year;
                return result => 1 ? resut + ' year' : resut + ' years';
            }
            // var replace1 = toDate.replace(/-/g, '.');
            // var replace2 = fromDate.replace(/-/g, '.');
            // console.log('replace1:',replace1)
            // console.log('replace2:',replace2)
            // var date2 = new Date(formatString(replace2));
            // var date1 = new Date(formatString(replace1));
            // console.log('date2:',date2)
            // console.log('date1:',date1)
            // var d1 = Math.ceil(date1.getTime() / (1000 * 3600 * 24));
            // var d2 = Math.ceil(date2.getTime() / (1000 * 3600 * 24));
            // console.log('d1:',d1);
            // console.log('d2:',d2);
            // console.log('d12:',d1-d2);
            // return d1 + d2;
        }

        // function printData() {
        //     var divToPrint = document.getElementById("printTable");
        //     newWin = window.open("");
        //     newWin.document.write(divToPrint.outerHTML);
        //     newWin.print();
        //     newWin.close();
        // }
        $scope.getCategory = function(value){
            console.log('value:',value);
        }
        $scope.printDiv = function() {
            console.log('sample');
            //     var divToPrint = document.getElementById("printTable");
            //     var newWin = window.open("");
            //     newWin.document.write(divToPrint.outerHTML);
            //     newWin.print();
            //     newWin.close();

            var printContents = document.getElementById('print').innerHTML;
            var popupWin = window.open("");
            popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
            popupWin.document.close();
        }

        // var popupWin = window.open('', '_blank', 'width=1000,height=600');
        // popupWin.document.getElementById('hidden_div').style.display = 'block'
        // popupWin.document.write('<html><head><link href="public/css/style.css" ' +
        //     'rel="stylesheet"><style>.ng-hide { display: none !important; }</style></head><body>' + document.querySelector('#div').innerHTML + '</html>');

        // setTimeout(function() {
        //     popupWin.print();
        //     popupWin.close();
        // }, 500);

        // var myPrintContent = document.getElementById(divName);
        // var myPrintWindow = window.open('', '_blank', 'width=1000,height=1000');
        // myPrintWindow.document.write(myPrintContent.innerHTML);
        // myPrintWindow.document.getElementById(divName).style.display = 'block'
        // myPrintWindow.document.close();
        // myPrintWindow.focus();
        // myPrintWindow.print();
        // myPrintWindow.close();
        // return false;
    }
})();
