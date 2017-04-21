(function() {
    'use strict';

    if (typeof jQuery === "undefined") {
        throw new Error("ICCP requires jQuery");
    }

    var ICCP = angular.module('ICCP', ['ui.router',
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
            'ngTable',
            'ui.materialize',
            'ngMdIcons'
        ])
        .constant('API_URL', 'http://localhost:3000')
        // .constant('API_URL', 'http://192.168.1.109:3001')
        .constant('API_VERSION', '/api/1.0/')
        .config(['$urlRouterProvider', '$stateProvider', 'RestangularProvider', 'API_URL', 'API_VERSION', '$httpProvider', 'localStorageServiceProvider', 'ChartJsProvider',
            function($urlRouterProvider, $stateProvider, RestangularProvider, API_URL, API_VERSION, $httpProvider, localStorageServiceProvider, ChartJsProvider) {
                $urlRouterProvider.otherwise('/login');

                localStorageServiceProvider.setPrefix('iccp');
                localStorageServiceProvider.setStorageType('localStorage');
                RestangularProvider.setBaseUrl(API_URL + API_VERSION);
                $httpProvider.interceptors.push('authInterceptor');

                ChartJsProvider.setOptions({ colors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });

                $stateProvider
                    .state('login', {
                        url: '/login',
                        templateUrl: 'public/templates/login.html',
                        controller: 'loginCtrl'
                    })
                    .state('login.dashboard', {
                        url: '/login',
                        templateUrl: 'public/templates/dashboard.html',
                        controller: 'MainCtrl'
                    })
                    .state('main', {
                        url: '/main',
                        templateUrl: 'public/templates/main.html',
                        controller: 'MainCtrl'
                    })
                    .state('main.dashboard', {
                        url: '/dashboard',
                        templateUrl: 'public/templates/dashboard.html',
                        controller: 'MainCtrl'
                    })
                    .state('main.alumni', {
                        url: '/alumni',
                        templateUrl: 'public/templates/alumni.html',
                        controller: 'alumniCtrl'
                    })
                    .state('main.addalumni', {
                        url: '/alumni/addalumni/:id',
                        templateUrl: 'public/templates/alumnis.html',
                        controller: 'alumniDetailCtrl'
                    })
                    .state('main.post', {
                        url: '/post/:id',
                        templateUrl: 'public/templates/wall_post.html',
                        controller: 'postingCtrl'
                    })
                    .state('main.report', {
                        url: '/report',
                        templateUrl: 'public/templates/report.html',
                        controller: 'reportCtrl'
                    })
                    .state('main.mailbox', {
                        url: '/mailbox',
                        templateUrl: 'public/templates/mailbox.html',
                        controller: 'mailCtrl'
                    })
                    .state('register', {
                        url: '/register',
                        templateUrl: 'public/templates/register.html'
                    })
                    .state('main.profile', {
                        url: '/profile/:id',
                        templateUrl: 'public/templates/profile.html',
                        controller: 'profileCtrl'
                    })
                    .state('main.jobmatch', {
                        url: '/jobmatch',
                        templateUrl: 'public/templates/job_match.html',
                        controller: 'jobmatchCtrl'
                    })
                    .state('main.courses', {
                        url: '/courses',
                        templateUrl: 'public/templates/courses.html',
                        controller: 'courseCtrl'
                    })
                    .state('main.batches', {
                        url: '/batches',
                        templateUrl: 'public/templates/batches.html',
                        controller: 'batchCtrl'
                    })
                    .state('main.useraccounts', {
                        url: '/useraccounts',
                        templateUrl: 'public/templates/accounts.html',
                        controller: 'accountCtrl'
                    })
                    .state('main.award', {
                        url: '/award',
                        templateUrl: 'public/templates/award.html',
                        controller: 'awardCtrl'
                    })
                    .state('main.search', {
                        url: '/search?value',
                        templateUrl: 'public/templates/search.html',
                        controller: 'searchCtrl'
                    })
                     .state('main.profiledetail', {
                        url: '/profiledetail/:id',
                        templateUrl: 'public/templates/profileDetail.html',
                        controller:'profileDetailCtrl'
                    })
                    // .state('main.mailbox.compose', {
                    //     url: '/compose',
                    //     templateUrl: 'public/templates/compose.html',
                    //     parent: 'main.mailbox'
                    // })
                    // .state('main.mailbox.inbox', {
                    //     url: '/inbox',
                    //     templateUrl: 'public/templates/inbox.html',
                    //     parent: 'main.mailbox'
                    // })
            }
        ])
        .run(['APIFactory', '$window', '$state', '$rootScope', '$location', 'localStorageService','$timeout',
            function(APIFactory, $window, $state, $rootScope, $location, localStorageService,$timeout) {
                $rootScope.loginuser = JSON.parse(localStorageService.get('appuser'));
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
                    $timeout(function() {
                        if (!_.isNull(APIFactory.getCurrentUser())) {
                            if (toState.name == 'login') {
                                event.preventDefault();
                                $state.go('main.post', null, { reload: true });
                            }
                        } else {
                            console.log('diri pud');
                            if (toState.name !== 'login') {
                                event.preventDefault();
                                $state.go('login', null, { reload: true });
                            }
                        }
                    }, 500)
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
