(function() {

    'use strict';

    var ICCP = angular.module('ICCP')
        .directive('sidebar', function() {
            return {
                restrict: 'C',
                compile: function(tElement, tAttrs, transclude) {
                    //Enable sidebar tree view controls
                    $.AdminLTE.tree(tElement);
                }
            };
        })
        .directive('header', function() {
            return {
                restrict: 'E',
                templateUrl: 'public/templates/header.html',
                compile: function(tElement, tAttrs, transclude) {
                    $.AdminLTE.pushMenu($(tElement).find('.sidebar-toggle'));
                }
            };
        })
        .directive('errSrc', function() {
            return {
                link: function(scope, element, attrs) {
                    scope.$watch(function() {
                        return attrs['ngSrc'];
                    }, function(value) {
                        if (!value) {
                            element.attr('src', attrs.errSrc);
                        }
                    });

                    element.bind('error', function() {
                        element.attr('src', attrs.errSrc);
                    });
                }
            };
        })
        .directive('numbersOnly', function() {
            return {
                require: 'ngModel',
                link: function(scope, element, attr, ngModelCtrl) {
                    function fromUser(text) {
                        if (text) {
                            var transformedInput = text.replace(/[^0-9-]/g, '');
                            if (transformedInput !== text) {
                                ngModelCtrl.$setViewValue(transformedInput);
                                ngModelCtrl.$render();
                            }
                            return transformedInput;
                        }
                        return undefined;
                    }
                    ngModelCtrl.$parsers.push(fromUser);
                }
            };
        });
})();
