angular.module('directory.controllers', [])

    .controller('StudentListCtrl', function ($scope, Students) {

        $scope.searchKey = "Ankit Saxena";

        $scope.clearSearch = function () {
            $scope.searchKey = "";
            $scope.students = Students.query();
        }

        $scope.search = function () {
            $scope.students = Students.query({name: $scope.searchKey});
        }

        $scope.students = Students.query();
    })

    .controller('StudentDetailCtrl', function($scope, $stateParams, Students) {
        console.log('details');
        $scope.student = Students.get({studentId: $stateParams.StudentId});
        
    })

    .controller('StudentReportsCtrl', function ($scope, $stateParams, Students) {
        console.log('reports');
        $scope.student = Students.get({StudentId: $stateParams.StudentId, data: 'reports'});
    });