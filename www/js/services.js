angular.module('directory.services', ['ngResource'])

    .factory('Students', function ($resource) {
        return $resource('/students/:studentId');
    })
    .factory('studentCache', function ($cacheFactory) {
        return $cacheFactory('appData');
    })
    .factory('Manage',function($resource){
       
       return $resource('/manage/getsubordinates/:email/:role');
        
    })
    .factory('GetCity',function($resource, $http) {
        return $resource('/city');
    })
    .factory('CityDetail',function($resource) {

        return $resource('/data/:city');

    })
//    .factory('LoginService',function($resource) {
//
//        return $resource('/login');
//        return $resource('/login', { username: '@username',password: '@password' }, {
//            charge: { method: 'POST' },
//            find: { method: 'POST' } // Added `find` action
//        });
//
//    })
    .factory('StudentMessenger',function($resource) {

        return $resource('/messenger');

    });
    
    