(function() {

    angular.module('ICCPmain')
        .factory('APIFactory', APIFactory);

    APIFactory.$inject = ['API_URL', 'API_VERSION', 'Restangular', 'localStorageService'];

    function APIFactory(API_URL, API_VERSION, Restangular, localStorageService) {
        return {
            getAllAlumni: function() {
                return Restangular.all('alumni').customGET().then(function(res) {
                        return res;
                    },
                    function(err) {
                        return err.data;
                    });
            },
            getDetailAlumni: function(id) {
                return Restangular.all('alumni').customGET(id).then(function(res) {
                        return res;
                    },
                    function(err) {
                        return err.data;
                    });
            },
            saveAlumni: function(data) {
                return Restangular.all('alumni').customPOST(data).then(function(res) {
                        return res;
                    },
                    function(err) {
                        return err.data;
                    });
            },
            updateAlumni: function(id, data) {
                return Restangular.all('alumni/' + id).customPUT(data).then(function(res) {
                        return res;
                    },
                    function(err) {
                        return err.data;
                    });
            },
            logout: function() {
                /*return Restangular.all('/logout').customDELETE().then(function(res) {
                    // localStorageService.remove('appuser');

                    return res;
                }, function(err) {
                    return err.data;
                });*/
                localStorageService.remove('appuser');
            },
            login: function(data) {
                console.log('data:',data);
                return Restangular.all('/login').customPOST(data).then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            postWall: function(data) {
                return Restangular.all('/wallpost').customPOST(data).then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },

            getallPost: function() {
                return Restangular.all('/wallpost').customGET().then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            getDetailPost: function(id, data) {
                return Restangular.all('/wallpost/' + id).customGET().then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            editPost: function(id, data) {
                return Restangular.all('/wallpost/' + id).customPUT(data).then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            deletePost: function(id) {
                return Restangular.all('/wallpost/' + id).customDELETE().then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            generateAlumniAccount: function(id) {
                return Restangular.all('username').customPOST(id).then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            updateUserAccount: function(id, data) {
                return Restangular.all('username/' + id).customPUT(data).then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            getJobHistory: function(id) {
                return Restangular.all('jobhistory').customGET(id).then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },

            createHistory: function(id, data) {
                return Restangular.all('jobhistory/' + id).customPOST(data).then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },

            updateHistory: function(id, data) {
                return Restangular.all('jobhistory/' + id).customPUT(data).then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            sendEmail: function(data) {
                return Restangular.all('email').customPOST(data).then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            getAllcourse: function(data) {
                return Restangular.all('course').customGET().then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            saveCourse: function(data) {
                return Restangular.all('course').customPOST(data).then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            getDetailCourse: function(id) {
                return Restangular.all('course').customGET(id).then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            updateCourse: function(id, data) {
                return Restangular.all('course/' + id).customPUT(data).then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            getAlljob: function() {
                return Restangular.all('jobhistory').customGET().then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            saveBatch: function(data) {
                return Restangular.all('batch').customPOST(data).then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            getAllBatch: function() {
                return Restangular.all('batch').customGET().then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            getDetailBatch: function(id) {
                return Restangular.all('batch').customGET(id).then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            updateBatch: function(id, data) {
                return Restangular.all('batch/' + id).customPUT(data).then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            saveAward: function(data) {
                return Restangular.all('award').customPOST(data).then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            getAllaward: function() {
                return Restangular.all('award').customGET().then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            getDetailAward: function(id) {
                return Restangular.all('award').customGET(id).then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            updateAward: function(id, data) {
                return Restangular.all('award/' + id).customPUT(data).then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            getuseraccounts: function() {
                return Restangular.all('useraccounts').customGET().then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            userResetPass: function(id) {
                console.log('id:', id)
                return Restangular.all('passwordreset/' + id).customGET().then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            getUserDetail: function(id) {
                return Restangular.all('username/' + id).customGET().then(function(res) {
                    return res;
                }, function(err) {
                    return err.data;
                });
            },
            getCurrentUser: function() {
                return localStorageService.get('appuser');
            },
        }

    }
})();
