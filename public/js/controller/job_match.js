(function(document) {
    'use strict';
    angular.module('ICCP')
        .controller('jobmatchCtrl', ['$scope', '$state', 'APIFactory', '$timeout', '$uibModal', jobmatchCtrl]);

    function jobmatchCtrl($scope, $state, APIFactory, $timeout, $uibModal) {
        console.log('jobmatchCtrl:');
        $scope.alumnis = [];
        $scope.jobs = [];
        $scope.donut = {};
        $scope.donut.data = [];

        APIFactory.getAllAlumni().then(function(data) {
            if (data.statusCode == 200 && data.response.success) {
                console.log('data:', data);
                var unemployed = [];
                var employed = [];
                var job_employed = [];
                var job_unemployed = [];
                var courserelated = [];
                var nocourserelated = [];
                var totalrelated = [];
                var donut = [];
                var nonrelate = [];
                _.each(data.response.result, function(row) {
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
                });
                employed = _.uniqBy(employed, 'alumni_id');
                donut.push({
                    value: "2",
                    label: "Employed"
                });
                console.log('unemployed:', unemployed);
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
                nocourserelated = _.flattenDeep(nocourserelated);
                console.log('nocourserelated:', nocourserelated)
                console.log('totalrelated:', totalrelated)
                var sumNonRelate = Math.round((nocourserelated.length / job_employed.length) * 100, sumNonRelate, 0);
                var sum = Math.round((totalrelated.length / job_employed.length) * 100, sum, 0);
                console.log('sumNonRelate:', sumNonRelate);
                donut.push({
                    value: sum.toString(),
                    label: "Course Related Job"
                });
                donut.push({
                     value: sumNonRelate.toString(),
                    label: "Non Related Job"
                   

                });
                $timeout(function() {
                    $scope.$apply(function() {
                        $scope.donut.data = donut;
                        $scope.donut.chartColors = ["#31C0BE", "#c7254e", "#98a0d3"];
                        $scope.donut.myFormatter = function(input) {
                            return input + '%';
                        };
                        console.log('$scope.donut:', $scope.donut);
                    });
                }, 1000);
                console.log('totalrelated:', totalrelated);
            }
        })
    }

})();
