angular.module('directory.controllers', [])

    .controller('StudentListCtrl', function ($scope, Students,$ionicLoading,studentCache, $window) {

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
                if(_.values(data[0]).join("")=='notloggedin') {
                    $ionicLoading.hide();
                    $window.location = '/#/login';
                }
                else {
                    $scope.students = data;
                    $rootScope.isLoggedin = true;
                    $ionicLoading.hide();
                }
            });
        }
        
        if(!appData.studentData)
        {
                Students.query().$promise.then(function(data) {
                    //
                    if(_.values(data[0]).join("")=='notloggedin') {
                        $ionicLoading.hide();
                        $window.location = '/#/login';
                    }
                    else {
                        appData.studentData = data;
                        $scope.students = data;
                        $rootScope.isLoggedin = true;
                        $ionicLoading.hide();
                    }
                });
            
        }
        else 
        {
            console.log(appData.studentData);
            $scope.students = appData.studentData;
            $ionicLoading.hide();
        }
            
        
    })

    .controller('StudentDetailCtrl', function($scope, $stateParams, Students,$ionicLoading,$rootScope,$window) {
        console.log('details');
        $ionicLoading.show({
            template: 'Loading...'

        });
        Students.get({studentId: $stateParams.StudentId}).$promise.then(function(data) {
            if(_.values(data[0]).join("")=='notloggedin') {
                $ionicLoading.hide();
                $window.location = '/#/login';
            }
            else {
                $scope.student = data;
                $rootScope.currentstudent = data;
                $rootScope.isLoggedin = true;
                $ionicLoading.hide();
                //task ids
                var user_task = $scope.student.user_tasks;
                $scope.task2 = _.where(user_task, {'task_id': '53d1e85abb5c82917b3a3a42'})[0];
                $scope.task3 = _.where(user_task, {'task_id': '53d1e8c9bb5c82917b3a3a43'})[0];
                $scope.task5 = _.where(user_task, {'task_id': '53d1ec3bbb5c82917b3a3a45'})[0];
                $scope.level3task1 = _.where(user_task, {'task_id': '53db763c68425b29ecc82f4e'})[0];
                $scope.level3task2 = _.where(user_task, {'task_id': '53db77ab68425b29ecc82f51'})[0];
                $scope.level3task3 = _.where(user_task, {'task_id': '53db781e68425b29ecc82f6a'})[0];
                $scope.level3task4 = _.where(user_task, {'task_id': '53db787f68425b29ecc82f6b'})[0];
                $scope.level4task1 = _.where(user_task, {'task_id': '53f73760e37edbac1f6dec17'})[0];
                $scope.level4task2 = _.where(user_task, {'task_id': '53f73770e37edbac1f6dec18'})[0];
                $scope.level4task5 = _.where(user_task, {'task_id': '53f73799e37edbac1f6dec1b'})[0];
                //ng-repeat answer in task2.answers  answer.name[0]
            }
            
        });
        
    })
 
   .controller('ContentController',function ContentController($scope, $ionicSideMenuDelegate) {
          $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
          };
        })

    .controller('StudentLoginCtrl',function ($scope, $ionicLoading, LoginService,$window, $rootScope) {
        $scope.username = undefined;
        $scope.password = undefined;
        $rootScope.isLoggedin = false;
        $scope.wrongpassword = false;

        $scope.onLogin = function() {
            LoginService.save({username: $scope.username,password: $scope.password}).$promise.then(function(res){
                if(res.passport && !!res.passport.user){
                    $window.location='/#/search';
                    $rootScope.isLoggedin = true;
                }
                else{
                    $scope.wrongpassword = true;
                    $scope.username = "";
                    $scope.password = "";
                }
            });
        };
    })
    .controller('StudentMessengerCtrl', function ($scope, StudentMessenger,$ionicLoading,studentCache,$window) {

        $ionicLoading.show({
            template: 'Loading...'
        });

        var appData = studentCache;
        if(!appData.messengerData)
        {
            StudentMessenger.query().$promise.then(function(data) {
                if(_.values(data[0]).join("")=='notloggedin') {
                    $ionicLoading.hide();
                    $window.location = '/#/login';
                }
                else {
                    appData.messengerData = data;
                    $scope.student_messenger = data;
                    $rootScope.isLoggedin = true;
                    $ionicLoading.hide();
                }

            });
        }
        else
        {
            $scope.student_messenger = appData.messengerData;
            $ionicLoading.hide();
        }
    })
    .controller('StudentReportsCtrl', function ($scope, $stateParams, Students, Manage,$ionicLoading, $window) {
        console.log('reports');
         $ionicLoading.show({
              template: 'Loading...'
            });
            
           
            
            
            
        Manage.query({email: $stateParams.email, role: $stateParams.role}).$promise.then(function(data){
            if(_.values(data[0]).join("")=='notloggedin') {
                $ionicLoading.hide();
                $window.location = '/#/login';
            }
            else {
                $ionicLoading.hide();
                $scope.reportees = data;
                $rootScope.isLoggedin = true;
            }

        });
    })
    .controller('CityReportsCtrl', function ($scope,$ionicLoading, GetCity, $window) {
        $ionicLoading.show({
            template: 'Loading...'
        });
        GetCity.query().$promise.then(function(data){
            if(_.values(data[0]).join("")=='notloggedin') {
                $ionicLoading.hide();
                $window.location = '/#/login';
            }
            else {
                $scope.cities = data;
                $rootScope.isLoggedin = true;
                $ionicLoading.hide();
            }

        });
//        $scope.cities = [{city:"New Delhi",count:16214},{city:"Mumbai",count:7506},{city:"Hyderabad",count:6573},{city:"Bangalore",count:4302},{city:"Chennai",count:2634},{city:"Pune",count:2474},{city:"Kolkata",count:2365},{city:"Jaipur",count:1850},{city:"Ahmedabad",count:1234},{city:"Noida",count:1169}];

    })
    .controller('CityDetailCtrl', function($scope, $stateParams,$ionicLoading, CityDetail, $window) {
        $ionicLoading.show({
            template: 'Loading...'
        });
        CityDetail.get({city: $stateParams.CityName}).$promise.then(function (data) {
            if(_.values(data[0]).join("")=='notloggedin') {
                $ionicLoading.hide();
                $window.location = '/#/login';
            }
            else {
                $scope.citydetail = data;
                $rootScope.isLoggedin = true;
                $ionicLoading.hide();
            }

        });
    })
    //zonal Manager controller start
    .controller('ZonalManagersCtrl', function($scope, $ionicLoading, ZonalManagerDetail,studentCache, $window) {
        $ionicLoading.show({
            template: 'Loading...'
        });
        var appData = studentCache;
        if(!appData.zonalData)
        {
            ZonalManagerDetail.query().$promise.then(function(data) {
                if(_.values(data[0]).join("")=='notloggedin') {
                    $ionicLoading.hide();
                    $window.location = '/#/login';
                }
                else {
                    appData.zonalData = data;
                    $scope.zonal_manager = data;
                    $rootScope.isLoggedin = true;
                    $ionicLoading.hide();
                }
            });
        }
        else
        {
            $scope.zonal_manager = appData.zonalData;
            $ionicLoading.hide();
        }
    })
    //zonal Manager controller end


    //project Manager controller start
    .controller('ProjectManagersCtrl', function($scope,$ionicLoading, ProjectManagerDetail, studentCache, $window) {
        $ionicLoading.show({
            template: 'Loading...'
        });

        var appData = studentCache;
        if(!appData.projectData)
        {
            ProjectManagerDetail.query().$promise.then(function(data) {
                if(_.values(data[0]).join("")=='notloggedin') {
                    $ionicLoading.hide();
                    $window.location = '/#/login';
                }
                else {
                    appData.projectData = data;
                    $scope.project_manager = data;
                    $rootScope.isLoggedin = true;
                    $ionicLoading.hide();
                }

            });
        }
        else
        {
            $scope.project_manager = appData.projectData;
            $ionicLoading.hide();
        }

    });
    //project Manager controller end
