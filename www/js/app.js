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

            .state('search', {
                url: '/search',
                templateUrl: 'templates/student-list.html',
                controller: 'StudentListCtrl'
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
            });

        $urlRouterProvider.otherwise('/search');

    });