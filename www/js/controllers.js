angular.module('directory.controllers', [])

    .controller('StudentListCtrl', function ($scope, Students,$ionicLoading,appCache) {

         $ionicLoading.show({
              template: 'Loading...'
            });

        var appData = appCache;
        $scope.searchKey = "";
       

        $scope.clearSearch = function () {
            $scope.searchKey = "";
            $scope.students = Students.query();
        }

        $scope.search = function () {
            $ionicLoading.show({
              template: 'Loading...'
            });
            Students.query({name: $scope.searchKey}).$promise.then(function(data){
                
                $scope.students= data;
                $ionicLoading.hide();
                
            });
        }
        
        if(!appData.studentData)
        {
                Students.query().$promise.then(function(data){
                    
                    appData.studentData = data;
                    $scope.students =data;
                    $ionicLoading.hide();
                    
                });
            
        }
        else 
        {
            console.log(appData.studentData);
            $scope.students = appData.studentData;
            $ionicLoading.hide();
        }
            
        
    })

    .controller('StudentDetailCtrl', function($scope, $stateParams, Students,$ionicLoading) {
        console.log('details');
        
            $ionicLoading.show({
              template: 'Loading...'
            });
        Students.get({studentId: $stateParams.StudentId}).$promise.then(function(data){
            
            $scope.student = data;
            
            $ionicLoading.hide();
        
        
            
        });
        
    })
 
   .controller('ContentController',function ContentController($scope, $ionicSideMenuDelegate) {
          $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
          };
        })

    .controller('StudentReportsCtrl', function ($scope, $stateParams, Students) {
        console.log('reports');
        $scope.student = Students.get({StudentId: $stateParams.StudentId, data: 'reports'});
    });