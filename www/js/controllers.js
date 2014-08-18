angular.module('directory.controllers', [])

    .controller('StudentListCtrl', function ($scope, Students,$ionicLoading,studentCache) {

         $ionicLoading.show({
              template: 'Loading...'
            });

        var appData = studentCache;
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

    .controller('StudentDetailCtrl', function($scope, $stateParams, Students,$ionicLoading,$rootScope) {
        console.log('details');
        
        
            $ionicLoading.show({
              template: 'Loading...'
            });
        Students.get({studentId: $stateParams.StudentId}).$promise.then(function(data){
            
            $scope.student = data;
            $rootScope.currentstudent = data;
            
            $ionicLoading.hide();
        
        
            
        });
        
    })
 
   .controller('ContentController',function ContentController($scope, $ionicSideMenuDelegate) {
          $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
          };
        })
    .controller('StudentMessengerCtrl', function ($scope, StudentMessenger,$ionicLoading,studentCache) {

        $ionicLoading.show({
            template: 'Loading...'
        });

        var appData = studentCache;
        if(!appData.messengerData)
        {
            StudentMessenger.query().$promise.then(function(data) {

                appData.messengerData = data;
                $scope.student_messenger = data;
                $ionicLoading.hide();
            });
        }
        else
        {
            $scope.student_messenger = appData.messengerData;
            $ionicLoading.hide();
        }
    })
    .controller('StudentReportsCtrl', function ($scope, $stateParams, Students, Manage,$ionicLoading) {
        console.log('reports');
         $ionicLoading.show({
              template: 'Loading...'
            });
            
           
            
            
            
        Manage.query({email: $stateParams.email, role: $stateParams.role}).$promise.then(function(data){
            
            $ionicLoading.hide();
            $scope.reportees = data;
            
        });
        
        
        
        
        
    });