(function() {
    'use strict';

    if (typeof jQuery === "undefined") {
        throw new Error("ICCPmain requires jQuery");
    }

    var ICCPmain = angular.module('ICCPmain', ['ui.router',
            'ui.bootstrap',
            'restangular',
            'ngAnimate',
            'mgcrea.ngStrap',
            'textAngular',
            'angularFileUpload',
            'ngFileUpload',
            'toastr',
            'LocalStorageModule',
            'angularMoment',
            'chart.js',
            'angucomplete-alt',
            'angular.morris',
            'ngPrint',
            'ngDialog',
            'xeditable',
            'AngularPrint',
            'ngTable'

        ])
        // .constant('API_URL', 'http://localhost:3000')
        .constant('API_URL', 'http://192.168.8.100:3000')
        .constant('API_VERSION', '/api/1.0/')
        .config(['$urlRouterProvider', '$stateProvider', 'RestangularProvider', 'API_URL', 'API_VERSION', '$httpProvider',
            function($urlRouterProvider, $stateProvider, RestangularProvider, API_URL, API_VERSION, $httpProvider) {
                $urlRouterProvider.otherwise('/iccp/main');

                // localStorageServiceProvider.setPrefix('iccpmain');
                // localStorageServiceProvider.setStorageType('localStorage');
                RestangularProvider.setBaseUrl(API_URL + API_VERSION);
                $httpProvider.interceptors.push('authInterceptor');

                // ChartJsProvider.setOptions({ colors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });

                $stateProvider
                    .state('iccp', {
                        url: '/iccp',
                        templateUrl: 'public/template2/main/iccp.html'
                    })
                    .state('iccp.main', {
                        url: '/main',
                        templateUrl: 'public/template2/main/main.html',
                        controller: 'MainCtrl'
                    })
                    .state('iccp.events', {
                        url: '/events',
                        templateUrl: 'public/template2/main/events.html',
                        controller: 'EventCtrl'
                    })
                    .state('iccp.news', {
                        url: '/news',
                        templateUrl: 'public/template2/main/news.html',
                        controller:'NewsCtrl'
                    })
                    .state('iccp.jobs', {
                        url: '/jobs',
                        templateUrl: 'public/template2/main/jobs.html',
                        controller:'JobsCtrl'
                    })
            }
        ])
        .run(['$window', '$state', '$rootScope', '$location', '$timeout',
            function($window, $state, $rootScope, $location, $timeout) {
                // $rootScope.loginuser = JSON.parse(localStorageService.get('appuser'));
                $rootScope.logout = function() {
                    console.log('logout');
                    // APIFactory.logout().then(function(data) {
                    //     console.log('data:', data);
                    //     // $state.go('/main');
                    // });
                    localStorageService.remove('appuser');

                    // $location.path("/login");
                    $state.go('login', null, { reload: true });
                }
                $rootScope.goBack = function() {
                    $window.history.back();
                };

                $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                    // $timeout(function() {
                    //     if (!_.isNull(APIFactory.getCurrentUser())) {
                    //         if (toState.name == 'login') {
                    //             event.preventDefault();
                    //             $state.go('main.post', null, { reload: true });
                    //         }
                    //     } else {
                    //         console.log('diri pud');
                    //         if (toState.name !== 'login') {
                    //             event.preventDefault();
                    //             $state.go('login', null, { reload: true });
                    //         }
                    //     }
                    // }, 500)
                    // if (toState.name == 'login') {
                    //     if (!_.isNull(APIFactory.getCurrentUser())) {
                    //     event.preventDefault();
                    //         var user = JSON.parse(localStorageService.get('appuser'));
                    //         if (user.person_type == 'Alumni') {
                    //             $state.go('main.post');
                    //         } else {
                    //             $state.go('main.alumni');
                    //         }
                    //     }else{
                    //     event.preventDefault();
                    //         console.log('hag.as')
                    //          $location.path("login");
                    //          $state.go('login');
                    //     }
                    // } else {
                    //         console.log('IDIR')
                    //     if (!_.isNull(APIFactory.getCurrentUser())) {
                    //         var user = JSON.parse(localStorageService.get('appuser'));
                    //         if (user.person_type == 'Alumni') {
                    //             $state.go('main.post');
                    //         } else {
                    //             $state.go('main.alumni');
                    //         }
                    //     } else {
                    //         console.log('dii');
                    //         $location.path("/login");
                    //     }
                    // }
                })
            }
        ])
        .factory('authInterceptor', ['$rootScope', '$q', '$location', '$injector',
            function authInterceptor($rootScope, $q, $location, $injector) {
                return {
                    request: function(config) {
                        config.headers = config.headers || {};

                        /*if (localStorageService.get('token')) {
                            var token = localStorageService.get('token');
                            var user = JSON.parse(localStorageService.get('user'));

                            config.headers.Authorization = 'Bearer ' + token;

                            if (user) {
                                config.headers.accesskey = user.subscriptionKey;
                            }

                        }*/

                        return config;
                    },
                    response: function(response) {
                        //JWT Token: If the token is a valid JWT token, new or refreshed, save it in the localStorage
                        /*if (localStorageService.get('token')) {
                            var storagedToken = localStorageService.get('token');
                            if (jwtHelper.isTokenExpired(storagedToken)) {
                                localStorageService.remove('token');
                                localStorageService.remove('user');

                                $location.path('/login');
                            }
                        }*/
                        return response;
                    },
                    responseError: function(response) {
                        if (response.status === 401) {
                            $rootScope.$broadcast('unauthorized');
                            $location.path('/login');
                        }
                        return response
                    }
                };
            }
        ]);

})();
