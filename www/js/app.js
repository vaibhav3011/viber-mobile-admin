angular.module('directory', ['ionic', 'directory.controllers', 'directory.services'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: 'StudentLoginCtrl'
            })
            .state('search', {
                url: '/search',
                controller: 'StudentListCtrl',
                templateUrl: 'templates/student-list.html'
            })

            .state('Student', {
                url: '/students/:StudentId',
                templateUrl: 'templates/student-detail.html',
                controller: 'StudentDetailCtrl'
            })

            .state('reports', {
                url: '/manage/:email/:role',
                templateUrl: 'templates/student-reports.html',
                controller: 'StudentReportsCtrl'
            })
            .state('messenger', {
                url: '/messenger',
                templateUrl: 'templates/student-messenger.html',
                controller: 'StudentMessengerCtrl'
            })
            .state('cityreport', {
                url: '/cityreport',
                templateUrl: 'templates/city-reports.html',
                controller: 'CityReportsCtrl'
            })
            .state('citydetail', {
                url: '/cities/:CityName',
                templateUrl: 'templates/city-detail.html',
                controller: 'CityDetailCtrl'
            })
            .state('zonalmanagers', {
                url: '/zonalmanagers',
                templateUrl: 'templates/zonalmanagers.html',
                controller: 'ZonalManagersCtrl'
            })
            .state('projectmanagers', {
                url: '/projectmanagers',
                templateUrl: 'templates/projectmanagers.html',
                controller: 'ProjectManagersCtrl'
            })
            .state('logout', {
                url: '/logout',
                templateUrl: 'templates/projectmanagers.html',
                controller: 'ProjectManagersCtrl'
            });

        $urlRouterProvider.otherwise('/login');

    });